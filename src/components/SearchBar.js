import React, { useState } from "react";
import { Grid2, TextField, InputAdornment } from "@mui/material";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ onSearch, placeholder = "Buscar..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Llama a la función de búsqueda mientras escribes
  };

  return (
    <Grid2>
      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder} // Placeholder dinámico
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
  );
};

export default SearchBar;
