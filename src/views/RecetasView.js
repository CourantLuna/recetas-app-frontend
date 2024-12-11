import React, { useEffect, useState } from "react";
import api from "../api";
import SearchBar from "../components/searchBar";
import AddRecipeDialog from "../components/recipeDialog";
import DeleteDialog from "../components/deleteDialog";
import DetallesReceta from "./DetallesReceta";

import {CircularProgress,Rating,IconButton,Card, CardMedia, Typography, CardActions, Box,
  Grid2, Chip, CardContent,} from "@mui/material";
import { MdFavoriteBorder, MdFavorite, MdTimer, MdBarChart, MdRestaurantMenu, MdShare,
 MdPrint, MdStarOutline, MdDelete, MdEdit,} from "react-icons/md"; // Importa solo una vez

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
      <SearchBar onSearch={handleSearch} onAddRecipe={handleOpenDialog} />

      {/* Cuadro de diálogo para añadir recetas */}
      <AddRecipeDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onRecipeAdded={handleRecipeAdded}
        onRecipeUpdated={handleRecipeUpdated}
        recipe={selectedRecipe}
      />

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
                <Card
                  sx={{
                    position: "relative", // Necesario para posicionar el overlay
                    "&:hover .overlay": {
                      opacity: 1, // Hace visible el layer al hacer hover
                    },
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)", // Escala el card ligeramente
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Aumenta la sombra
                    },
                    width: 300,
                    height: 430,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1,
                    paddingY: 1,
                    alignSelf: "flex-start",
                  }}
                  onClick={() => handleViewDetails(receta)} // Abrir detalles al hacer clic
                >
                  {/* Primera fila: Título + Corazón */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "54px",
                      paddingX: 1,
                      columnGap: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {receta.Nombre}
                    </Typography>
                    <Box
                      onMouseEnter={() => setHovered(receta.RecetaID)}
                      onMouseLeave={() => setHovered(null)}
                      sx={{ cursor: "pointer" }}
                    >
                      {hovered === receta.RecetaID ? (
                        <MdFavorite size={24} color="red" />
                      ) : (
                        <MdFavoriteBorder size={24} color="gray" />
                      )}
                    </Box>
                  </Box>

                  {/* Segunda fila: Calificación */}
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                      paddingX: 1,
                      columnGap: 1,
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={value}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <MdStarOutline
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Box sx={{ ml: 0 }}>{`(${
                      receta.CantidadCalificaciones || 5
                    })`}</Box>
                    <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                  </Box>

                  {/* Imagen */}
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="190"
                      image={
                        receta.ImageUrl ||
                        "https://via.placeholder.com/300x200?text=Upload+Image"
                      }
                      alt={receta.Nombre}
                      sx={{
                        marginTop: 1,
                        padding: 0,
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Layer Transparente */}
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        top: "9px",
                        left: 0,
                        width: "100%",
                        height: "96%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderRadius: "8px",
                        opacity: 0, // Oculto inicialmente
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      Clic para ver más
                    </Box>

                  </Box>

                  {/* Cuarta fila: Chips con iconos */}
                  <CardContent
                    sx={{
                      display: "flex",
                      alignContent: "flex-start",
                      paddingX: 1,
                      columnGap: 1,
                    }}
                  >
                    <Chip
                      label={`${receta.TiempoPreparacion || 0} '`}
                      icon={<MdTimer />}
                      variant="outlined"
                    />
                    <Chip
                      label={receta.Dificultad || "Fácil"}
                      icon={<MdBarChart />}
                      variant="outlined"
                    />
                    <Chip
                      label={`${receta.Porciones || 1} porciones`}
                      icon={<MdRestaurantMenu />}
                      variant="outlined"
                    />
                  </CardContent>

                  {/* Quinta fila: Acciones */}
                  <CardActions
                    sx={{ justifyContent: "space-around", padding: 1 }}
                    onClick={(e) => e.stopPropagation()} // Detiene la propagación del evento al card
                  >
                    <IconButton edge="end" aria-label="edit">
                      <MdEdit
                        size={24}
                        color="blue"
                        onClick={(e) => {
                          e.stopPropagation(); // Detiene la propagación del evento al card
                          handleEditRecipe(receta);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Detiene la propagación del evento al card
                        handleOpenConfirmDialog(receta);
                      }}
                    >
                      <MdDelete size={24} color="blue" />
                    </IconButton>
                    <IconButton edge="end" aria-label="share">
                      <MdShare
                        size={24}
                        color="blue"
                        onClick={(e) => {
                          e.stopPropagation(); // Detiene la propagación del evento al card
                          //  handleShareRecipe(receta);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="print"
                      onClick={(e) => {
                        e.stopPropagation(); // Detiene la propagación del evento al card
                        // handlePrintRecipe(receta);
                      }}
                    >
                      <MdPrint size={24} color="blue" />
                    </IconButton>

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

                  </CardActions>
                </Card>
              </Grid2>
            ))}
            <DetallesReceta
              open={isDetallesOpen}
              onClose={handleCloseDetails}
              receta={selectedReceta}
            />
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};

export default RecetasView;
