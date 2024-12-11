import React, { useState } from "react";

import { Dialog, DialogTitle,DialogContent, DialogActions, TextField, Button, Grid,
        InputAdornment,MenuItem,} from "@mui/material";

import { MdImage } from "react-icons/md";

import api from "../api";

const initialRecipeState = {
  Nombre: "",
  Descripcion: "",
  TiempoPreparacion: "",
  Instrucciones: "",
  Porciones: 1,
  Puntuacion: 0,
  NumeroValoraciones: 0,
  Utensilios: "",
  Autor: "Desconocido",
  Categoria: "Sin categoría",
  Dificultad: "",
  Tags: "",
  InformacionNutricional: {
   " Proteinas": "",
    "Carbohidratos": "",
    "Grasas": "",
  },
  ImageUrl: "",
};

const RecipeDialog = ({ open, onClose, onRecipeAdded, onRecipeUpdated, recipe }) => {
  const [newRecipe, setNewRecipe] = useState(recipe || initialRecipeState);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (recipe) {
        setNewRecipe({
            ...initialRecipeState,
            ...recipe,
            Instrucciones: Array.isArray(recipe.Instrucciones)
                ? recipe.Instrucciones.join("\n")
                : recipe.Instrucciones || "",
            InformacionNutricional: typeof recipe.InformacionNutricional === "string"
                ? JSON.parse(recipe.InformacionNutricional)
                : recipe.InformacionNutricional || {
                    Proteinas: "",
                    Carbohidratos: "",
                    Grasas: "",
                },
        });
    }
}, [recipe]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["Proteinas", "Carbohidratos", "Grasas"].includes(name)) {
      setNewRecipe((prevState) => ({
        ...prevState,
        InformacionNutricional: {
          ...prevState.InformacionNutricional,
          [name]: value,
        },
      }));
    } else {
      setNewRecipe((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true);
    try {
       // Convertir las instrucciones en un string separado por comas limpio
    const instruccionesString = newRecipe.Instrucciones
    ? newRecipe.Instrucciones.split(/[\n,]/)
        .map((step) => step.trim())
        .filter((step) => step !== "")
        .join(",") // String separado por comas
    : "";
  
      // Prepara el payload para enviar
      const payload = {
        ...newRecipe,
        Instrucciones: instruccionesString,
        InformacionNutricional: JSON.stringify({
            Proteinas: parseFloat(newRecipe.InformacionNutricional.Proteinas || "0"),
            Carbohidratos: parseFloat(newRecipe.InformacionNutricional.Carbohidratos || "0"),
            Grasas: parseFloat(newRecipe.InformacionNutricional.Grasas || "0"),
        }),
    };
    
  
      let response;
      if (recipe) {
        // Actualización
        response = await api.put(`/recetas/${recipe.RecetaID}`, payload);
        if (onRecipeUpdated) {
          onRecipeUpdated(response.data); // Callback para actualizar
        }
      } else {
        // Creación
        response = await api.post("/recetas", payload);
        if (onRecipeAdded) {
          onRecipeAdded(response.data); // Callback para añadir
        }
      }
  
      console.log(recipe ? "Receta actualizada:" : "Receta creada:", response.data);
      setNewRecipe(initialRecipeState); // Resetea el formulario
      onClose(); // Cierra el diálogo
    } catch (error) {
      console.error(
        "Error gestionando la receta:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };
  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Añadir Nueva Receta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Imagen de Vista Previa */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={
                newRecipe.ImageUrl ||
                "https://placehold.co/600x400?text=Añade\n tu imagen"
              }
              alt="Vista previa de la imagen"
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
          </Grid>

          {/* URL de la Imagen */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL de la imagen"
              name="ImageUrl"
              value={newRecipe.ImageUrl}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdImage />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Campo Nombre de la receta */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de la receta"
              name="Nombre"
              value={newRecipe.Nombre}
              onChange={handleInputChange}
              required
            />
          </Grid>
          {/* Campo autor de la receta */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Autor"
              name="Autor"
              value={newRecipe.Autor}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Campo Descripción de la receta */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="Descripcion"
              value={newRecipe.Descripcion}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>
          {/* Campo Instrucciones de la receta */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Instrucciones (separadas por comas)"
              name="Instrucciones"
              value={newRecipe.Instrucciones}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>

          {/* Campo TiempoPreparacion de la receta */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tiempo de preparación (min)"
              name="TiempoPreparacion"
              value={newRecipe.TiempoPreparacion}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          {/* Campo Porciones de la receta */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Porciones"
              name="Porciones"
              value={newRecipe.Porciones}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          {/* Campo Dificultad de la receta */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Dificultad"
              name="Dificultad"
              value={newRecipe.Dificultad}
              onChange={handleInputChange}
              helperText="Selecciona la dificultad de la receta"
              required
            >
              {["Fácil", "Medio", "Difícil"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Campo Categoria de la receta */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Categoría"
              name="Categoria"
              value={newRecipe.Categoria}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Campo Utensilios de la receta */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Utensilios (separados por comas)"
              name="Utensilios"
              value={newRecipe.Utensilios}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Campo Tags de la receta */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tags (separados por comas)"
              name="Tags"
              value={newRecipe.Tags}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Información Nutricional */}
          {/* Proteinas */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Proteínas (g)"
              name="Proteinas"
              value={newRecipe.InformacionNutricional?.Proteinas || ""}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          {/* Carbohidratos */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Carbohidratos (g)"
              name="Carbohidratos"
              value={newRecipe.InformacionNutricional?.Carbohidratos || ""}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
          {/* Grasas */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Grasas (g)"
              name="Grasas"
              value={newRecipe.InformacionNutricional?.Grasas || ""}
              onChange={handleInputChange}
              type="number"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {recipe ? "Guardar Cambios" : "Añadir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeDialog;
