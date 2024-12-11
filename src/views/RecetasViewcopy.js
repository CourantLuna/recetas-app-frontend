import React, { useEffect, useState } from "react";
import api from "../api";
import SearchBar from "../components/searchBar";
import AddRecipeDialog from "../components/recipeDialog";
import DeleteDialog from "../components/deleteDialog";
import DetallesReceta from "./DetallesReceta";
import RecipeCard from "../components/RecipeCard";
import { MdAdd } from "react-icons/md";


import {CircularProgress, Box, Grid2,Button} from "@mui/material";

const RecetasView = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [hovered, setHovered] = useState(null); // Guarda el estado del hover
  const [dialogOpen, setDialogOpen] = useState(false); //abrir CreateDialog
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); //abrir DeleteDialog
  const [selectedReceta, setSelectedReceta] = useState(null); // Para almacenar la receta a eliminar
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDetallesOpen, setIsDetallesOpen] = useState(false);

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setDialogOpen(true);
  };
  const handleRecipeUpdated = (updatedRecipe) => {
    setRecetas((prevRecetas) =>
      prevRecetas.map((r) =>
        r.RecetaID === updatedRecipe.RecetaID ? updatedRecipe : r
      )
    );
    setDialogOpen(false); // Cierra el diálogo después de guardar
  };

  useEffect(() => {
    const fetchRecetas = async () => {
      setLoading(true); // Activar indicador de carga
      try {
        const response = await api.get("/recetas"); // Llamada al endpoint para obtener todas las recetas
        setRecetas(response.data); // Guardar las recetas en el estado
      } catch (error) {
        console.error("Error obteniendo recetas:", error);
      } finally {
        setLoading(false); // Desactivar indicador de carga
      }
    };

    fetchRecetas();
  }, []);

  // Función para manejar búsquedas
  const handleSearch = async (term) => {
    setLoading(true); // Activar indicador de carga
    try {
      let response;

      if (term.trim() === "") {
        // Si el término está vacío, trae todas las recetas
        response = await api.get("/recetas");
      } else {
        // Llamada al endpoint de búsqueda
        response = await api.get(`/search?p=${term}`);
      }

      setRecetas(response.data); // Actualizar las recetas con los resultados
    } catch (error) {
      console.error("Error buscando recetas:", error);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  // Funciónes para manejar cuando se añade una nueva receta
  const handleRecipeAdded = (newRecipe) => {
    setRecetas((prevRecetas) => [newRecipe, ...prevRecetas]);
    setDialogOpen(false); // Cerrar el diálogo
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  //Funciones para manejar eliminación de una receta
  const handleConfirmDelete = async () => {
    if (!selectedReceta) return;

    try {
      // Llamar al endpoint de eliminación
      await api.delete(`/recetas/${selectedReceta.RecetaID}`);
      setRecetas((prevRecetas) =>
        prevRecetas.filter(
          (receta) => receta.RecetaID !== selectedReceta.RecetaID
        )
      );
      setOpenConfirmDialog(false); // Cerrar el diálogo
      setSelectedReceta(null);
    } catch (error) {
      console.error("Error eliminando receta:", error);
    }
  };

  //Función para abrir y cerrar el diálogo:
  const handleOpenConfirmDialog = (receta) => {
    setSelectedReceta(receta);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedReceta(null);
  };
  //Funciones para abrir/cerrar vista detalles recetas
  const handleViewDetails = (receta) => {
    setSelectedReceta(receta);
    setIsDetallesOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetallesOpen(false);
    setSelectedReceta(null);
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const value = 3.5;

  return (
    <Box>
      {/* Search Bar */}

      <Grid2
      container
      rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}
      alignItems="center"
      justifyContent="space-around"
      sx={{ marginBottom: 4 }}
    >
      {/* Search Bar */}
      <Grid2 item size={8}>
      <SearchBar onSearch={handleSearch}/>
      </Grid2>

      {/* Add Recipe Button */}
      <Grid2 item size={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MdAdd size="24px" />}
          onClick={handleOpenDialog} // Evento al hacer clic
          fullWidth
          sx={{minHeight:'56px', borderRadius:3}}
        >
          Añadir Receta
        </Button>
      </Grid2>
    </Grid2>

      {/* Cuadro de diálogo para añadir recetas */}
      <AddRecipeDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onRecipeAdded={handleRecipeAdded}
        onRecipeUpdated={handleRecipeUpdated}
        recipe={selectedRecipe}
      />

      {/* contenido matriz de recetas */}
      {loading ? (
        <CircularProgress /> // Mostrar indicador de carga mientras se obtienen los datos
      ) : (
        <Grid2
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          wrap="wrap"
        >
          <Grid2 container maxWidth={"90vw"} justifyContent="center">
            {recetas.map((receta) => (
              <Grid2 item key={receta.RecetaID}>
                <RecipeCard
                  receta={receta}
                  hovered={hovered}
                  setHovered={setHovered}
                  handleViewDetails={handleViewDetails}
                  handleEditRecipe={handleEditRecipe}
                  handleOpenConfirmDialog={handleOpenConfirmDialog}
                  labels={labels}
                  value={value}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      )}

      <DetallesReceta
        open={isDetallesOpen}
        onClose={handleCloseDetails}
        receta={selectedReceta}
      />
      {/* Componente Dialog para manejar confirmacion de delete */}
      <DeleteDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
        receta={selectedReceta}
        itemName={selectedReceta?.Nombre}
        itemLabel="la receta"
        title="Eliminar Receta"
      />
    </Box>
  );
};

export default RecetasView;
