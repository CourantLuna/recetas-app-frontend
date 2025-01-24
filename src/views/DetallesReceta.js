import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Divider,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { MdAccessTime, MdBookmark, MdShare, MdPrint } from "react-icons/md";
import api from "../api";

const DetallesReceta = ({ open, onClose, receta }) => {
  const [ingredientes, setIngredientes] = useState([]);
  const [todosIngredientes, setTodosIngredientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [selectedIngrediente, setSelectedIngrediente] = useState(null); // Ingrediente seleccionado
  const [cantidad, setCantidad] = useState(""); // Cantidad ingresada

  const [editandoIngrediente, setEditandoIngrediente] = useState(null); // Ingrediente que se está editando

  const handleEditIngrediente = (ingrediente) => {
    setSelectedIngrediente(ingrediente.Ingrediente); // Preseleccionar el ingrediente
    setCantidad(ingrediente.Cantidad); // Prellenar la cantidad
    setEditandoIngrediente(ingrediente); // Establecer el ingrediente en edición
  };
  
  const refreshIngredientes = async () => {
    try {
      const response = await api.get(`/recetaingredientes/receta/${receta.RecetaID}`);
      setIngredientes(response.data);
    } catch (error) {
      console.error("Error actualizando la lista de ingredientes:", error);
    }
  };

  // Manejar el botón de añadir ingrediente
  const handleAddIngrediente = async () => {
  if (!selectedIngrediente || !cantidad || isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor selecciona un ingrediente y una cantidad válida.");
    return;
  }

  try {
    setLoading(true);

    if (editandoIngrediente) {
      // Actualizar ingrediente existente
      await api.put(`/recetaingredientes/${editandoIngrediente.id}`, {
        RecetaID: receta.RecetaID,
        IngredienteID: selectedIngrediente.IngredienteID,
        Cantidad: parseFloat(cantidad),
      });
    
      // Actualizar la lista de ingredientes en el estado
      setIngredientes((prev) =>
        prev.map((ing) =>
          ing.id === editandoIngrediente.id
            ? { ...ing, Ingrediente: selectedIngrediente, Cantidad: parseFloat(cantidad) }
            : ing
        )
      );
      // Aquí añadimos el await para refrescar
      await refreshIngredientes();
    
      setEditandoIngrediente(null); // Limpiar el estado de edición
    }
     else {
      // Añadir nuevo ingrediente
      await api.post(`/recetaingredientes`, {
        RecetaID: receta.RecetaID,
        IngredienteID: selectedIngrediente.IngredienteID,
        Cantidad: parseFloat(cantidad),
      });

      // Actualizar la lista de ingredientes vinculados a la receta
      const nuevoIngrediente = {
        Ingrediente: {
          ...selectedIngrediente,
        },
        Cantidad: parseFloat(cantidad),
      };
      setIngredientes((prev) => [...prev, nuevoIngrediente]);
    }


    // Limpiar los campos
    setSelectedIngrediente(null);
    setCantidad("");
    // await refreshIngredientes();

  } catch (error) {
    console.error("Error gestionando ingrediente:", error);
  } finally {
    setLoading(false);
  }
};

// Manejar el botón de eliminar ingrediente
const handleDeleteIngrediente = async (ingredienteID) => {
  if (!receta || !receta.RecetaID) {
    console.error("No hay receta seleccionada para eliminar el ingrediente.");
    return;
  }

  try {
    setLoading(true);
    await api.delete(`http://localhost:3001/api/recetaingredientes/${receta.RecetaID}/${ingredienteID}`); // Llama al endpoint para eliminar
    setIngredientes((prev) =>
      prev.filter((ingrediente) => ingrediente.Ingrediente.IngredienteID !== ingredienteID) // Actualiza la lista
    );
    console.log("Ingrediente eliminado correctamente.");
  } catch (error) {
    console.error("Error eliminando ingrediente:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const fetchIngredientes = async () => {
      if (!receta || !receta.RecetaID) {
        setError(true);
        return;
      }

      try {
        const response = await api.get(
          `/recetaingredientes/receta/${receta.RecetaID}`
        );
        const todosIngredientesResponse = await api.get(`/ingredientes`);
        setTodosIngredientes(todosIngredientesResponse.data);

        if (
          todosIngredientesResponse.data &&
          todosIngredientesResponse.data.length > 0
        ) {
          setTodosIngredientes(todosIngredientesResponse.data);
        } else {
          setTodosIngredientes([]);
        }

        if (response.data && response.data.length > 0) {
          setIngredientes(response.data);
          setError(false);
        } else {
          setIngredientes([]);
          setError(true);
        }
      } catch (error) {
        console.error("Error obteniendo los ingredientes:", error);
        setError(true);
      }
    };

    fetchIngredientes();
  }, [receta]);

  if (!receta) return null; // Maneja el caso en que no haya receta seleccionada
  // Asegurarnos de que InformacionNutricional sea un objeto

  let informacionNutricional = receta.InformacionNutricional;

  if (informacionNutricional) {
    if (typeof informacionNutricional === "string") {
      try {
        informacionNutricional = JSON.parse(informacionNutricional);
      } catch (error) {
        console.error("Error al parsear InformacionNutricional:", error);
        informacionNutricional = {};
      }
    }
  } else {
    informacionNutricional = {};
  }
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{ borderRadius: 5 }}
    >
      <DialogContent>
        <Box sx={{ padding: 3 }}>
          {/* Encabezado */}
          <Box sx={{ position: "relative", textAlign: "center", mb: 2 }}>
            <img
              src={receta.ImageUrl || "https://via.placeholder.com/800x400"}
              alt={receta.Nombre}
              style={{ width: "80%", borderRadius: "8px" }}
            />
            <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
              {receta.Nombre}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Por {receta.Autor}
            </Typography>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Box display="flex" alignItems="center">
                <MdAccessTime size={20} />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {receta.TiempoPreparacion} min
                </Typography>
              </Box>
              <Typography variant="body1">
                Dificultad: {receta.Dificultad}
              </Typography>
              <Typography variant="body1">
                Calificación: ⭐ {receta.Puntuacion || 5.0}{" "}
              </Typography>
            </Grid>
          </Box>

          <Divider />

          {/* Ingredientes */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Ingredientes
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Porciones: {receta.Porciones}
            </Typography>

            {/* Mensaje si no hay ingredientes */}
            {error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                No hay ingredientes asociados con esta receta.
              </Alert>
            )}

           {/* Lista de ingredientes */}
{!error && (
  <List sx={{ bgcolor: "#f9f9f9", borderRadius: "8px", p: 2 }}>
    {ingredientes.map((ingrediente, index) => (
      <ListItem
        key={index}
        sx={{
          position: "relative", // Necesario para posicionar los botones de acción
          "&:hover": {
            bgcolor: "#f1f1f1",
            ".actions": {
              visibility: "visible", // Muestra los botones al hacer hover
            },
          },
        }}
      >
        <ListItemIcon>
          <Checkbox edge="start" disableRipple />
        </ListItemIcon>
        <ListItemText
          primary={ingrediente.Ingrediente.Nombre || "Ingrediente sin nombre"}
          secondary={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {ingrediente.Cantidad
                  ? `${ingrediente.Cantidad} ${ingrediente.Ingrediente.Unidad}`
                  : "Sin cantidad"}
              </Typography>
              {/* Botones de acción */}
              <Box
                className="actions" // Clase para controlar visibilidad
                sx={{
                  display: "flex",
                  visibility: "hidden", // Oculta los botones inicialmente
                  position: "absolute",
                  right: 0,
                }}
              >
                <Button
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => handleEditIngrediente(ingrediente)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteIngrediente(ingrediente.Ingrediente.IngredienteID)}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          }
          primaryTypographyProps={{ fontWeight: "bold" }}
        />
      </ListItem>
    ))}
  </List>
)}

          </Box>

          {/* Fila para añadir ingredientes */}
          <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
            {/* Autocomplete para seleccionar ingrediente */}
            <Grid item xs={6}>
              <Autocomplete
                options={todosIngredientes.filter(
                  (ingrediente) => ingrediente?.Nombre
                )} // Filtra elementos sin Nombre
                getOptionLabel={(option) => option?.Nombre || ""} // Usa Nombre o un string vacío
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Ingrediente" />
                )}
                onChange={(event, value) => {
                  setSelectedIngrediente(value);
                }}
              />
            </Grid>

            {/* Campo de cantidad */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </Grid>

            {/* Campo bloqueado para mostrar la unidad */}
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Unidad"
                value={selectedIngrediente?.Unidad || "Sin unidad"} // Muestra la unidad del ingrediente seleccionado
                InputProps={{
                  readOnly: true, // Campo bloqueado
                }}
              />
            </Grid>

            {/* Botón para añadir */}
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddIngrediente}
                disabled={loading}
              >
                {editandoIngrediente ? "Guardar" : "Añadir"}
              </Button>
            </Grid>
          </Grid>

          <Divider />

          {/* Instrucciones */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              ¡A cocinar!
            </Typography>
            <List>
              {receta.Instrucciones &&
                receta.Instrucciones.split(",").map((step, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={`${index + 1}. ${step
                        .replace(/['"]/g, "")
                        .trim()}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>

          <Divider />

          {/* Información Nutricional */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Información Nutricional
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Typography variant="body2">🥩</Typography>
                </ListItemIcon>
                <ListItemText
                  primary={`Proteínas: ${
                    informacionNutricional.Proteinas || "0"
                  } g`}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Typography variant="body2">🍞</Typography>
                </ListItemIcon>
                <ListItemText
                  primary={`Carbohidratos: ${
                    informacionNutricional.Carbohidratos || "0"
                  } g`}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Typography variant="body2">🧈</Typography>
                </ListItemIcon>
                <ListItemText
                  primary={`Grasas: ${informacionNutricional.Grasas || "0"} g`}
                />
              </ListItem>
            </List>
          </Box>

          <Divider />

          {/* Acciones */}
          <Grid container justifyContent="space-around" sx={{ mt: 3 }}>
            <Button startIcon={<MdBookmark />} variant="contained">
              Guardar
            </Button>
            <Button startIcon={<MdShare />} variant="contained">
              Compartir
            </Button>
            <Button startIcon={<MdPrint />} variant="contained">
              Imprimir
            </Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetallesReceta;
