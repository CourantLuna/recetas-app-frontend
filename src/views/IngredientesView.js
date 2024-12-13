import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  Button,
  Typography,
  ListItem,
  Grid2,
  ListItemButton,
  Divider,
  Avatar,
  ListItemAvatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdDelete, MdEdit, MdLocalDining, MdAdd } from "react-icons/md";
import SearchBar from "../components/searchBar";
import DeleteDialog from "../components/deleteDialog";

const IngredientesView = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIngrediente, setSelectedIngrediente] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  // Obtener ingredientes desde la API
  const fetchIngredientes = async (searchTerm = "") => {
    setLoading(true);
    try {
      const endpoint = searchTerm.trim()
        ? `/search/ingredientes?p=${searchTerm}`
        : "/ingredientes";
      const response = await api.get(endpoint);
      setIngredientes(response.data);
    } catch (error) {
      console.error("Error cargando ingredientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Confirmar eliminación de un ingrediente
  const handleDelete = async () => {
    if (!selectedIngrediente) return;

    try {
      await api.delete(`/ingredientes/${selectedIngrediente.IngredienteID}`);
      setIngredientes((prevIngredientes) =>
        prevIngredientes.filter(
          (ingrediente) =>
            ingrediente.IngredienteID !== selectedIngrediente.IngredienteID
        )
      );
      closeDeleteDialog();
    } catch (error) {
      console.error("Error eliminando ingrediente:", error);
    }
  };

  // Abrir diálogo de confirmación
  const openDeleteDialog = (ingrediente) => {
    setSelectedIngrediente(ingrediente);
    setOpenConfirmDialog(true);
  };

  // Cerrar diálogo de confirmación
  const closeDeleteDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedIngrediente(null);
  };

  // Efecto inicial para cargar ingredientes
  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <Box>
      {/* Barra de búsqueda y botón para añadir ingrediente */}
      <Grid2
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        justifyContent="space-around"
        sx={{ marginBottom: 4 }}
      >
        <Grid2 item size={8}>
          <SearchBar
            onSearch={(term) => fetchIngredientes(term)} // Pasar el término de búsqueda
            placeholder="Buscar ingredientes..."
          />
        </Grid2>
        <Grid2 item size={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdAdd size="24px" />}
            fullWidth
            sx={{ minHeight: "56px", borderRadius: 3 }}
            onClick={() => console.log("Añadir ingrediente")}
          >
            Añadir Ingrediente
          </Button>
        </Grid2>
      </Grid2>

      {/* Lista de ingredientes */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid2 container justifyContent={"center"}>
          <Grid2 container columns={1} minWidth={"90vw"}>
            {ingredientes.map((ingrediente) => (
              <Grid2 item size={1} key={ingrediente.IngredienteID}>
                <ListItem>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>
                        <MdLocalDining size={"24px"} />
                      </Avatar>
                    </ListItemAvatar>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ minWidth: "90vw" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >{`${ingrediente.Nombre || "Ingrediente X"}`}</Typography>
                      <Typography
                        variant="body1"
                        color="initial"
                      >{`${ingrediente.Marca || "Genérico"}`}</Typography>
                    </Box>
                  </ListItemButton>

                  <Grid2 container columnGap={3} alignItems="center">
                    <Grid2 item size={3}>
                      <IconButton edge="end" aria-label="edit">
                        <MdEdit />
                      </IconButton>
                    </Grid2>
                    <Grid2 item size={3}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => openDeleteDialog(ingrediente)}
                      >
                        <MdDelete />
                      </IconButton>
                    </Grid2>
                  </Grid2>
                </ListItem>
                <Divider />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <DeleteDialog
        open={openConfirmDialog}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        itemName={selectedIngrediente?.Nombre}
        itemLabel="el ingrediente"
        title="Eliminar ingrediente"
      />
    </Box>
  );
};

export default IngredientesView;
