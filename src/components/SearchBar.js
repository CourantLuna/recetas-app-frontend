import React, { useState } from "react";
import { Grid2, TextField, Button, InputAdornment } from "@mui/material";
import { MdAdd, MdSearch } from "react-icons/md";

const SearchBar = ({ onSearch, onAddRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Llama a la función de búsqueda mientras escribes
  };

  const handleAddRecipe = () => {
    onAddRecipe(); // Llama a la función de añadir receta
  };

  return (
    <Grid2
      container
      rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      alignItems="center"
      justifyContent="space-around"
      sx={{ marginBottom: 4 }}
    >
      {/* Search Bar */}
      <Grid2 item size={8}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar receta por nombre"
          value={searchTerm}
          onChange={handleInputChange} // Evento al escribir en el campo
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch size="24px" color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: 2, // Bordes redondeados (equivalente a 16px)
            "& .MuiOutlinedInput-root": {
              borderRadius: 3, // Aplica el borde redondeado al contenedor del TextField
            },
          }}
        />
      </Grid2>

      {/* Add Recipe Button */}
      <Grid2 item size={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MdAdd size="24px" />}
          onClick={handleAddRecipe} // Evento al hacer clic
          fullWidth
          sx={{minHeight:'56px', borderRadius:3}}
        >
          Añadir Receta
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default SearchBar;
