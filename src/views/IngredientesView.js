import React, { useEffect, useState } from "react";
import api from "../api"; // Asegúrate de tener configurado el cliente API
import {Box, Typography,ListItem, Grid2,  ListItemButton, Divider, Avatar, ListItemAvatar, IconButton} from "@mui/material";
import { MdDelete, MdEdit, MdLocalDining 
  
} from "react-icons/md";

const IngredientesView = () => {
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const response = await api.get("/ingredientes"); // Asegúrate de que esta ruta sea correcta
        setIngredientes(response.data);
      } catch (error) {
        console.error("Error cargando ingredientes:", error);
      }
    };

    fetchIngredientes();
  }, []);

  return (
    <Grid2 container justifyContent={"center"}>
      <Grid2 container columns={1} Width={"100vw"}>
        {ingredientes.map((ingrediente) => (
          <Grid2 item size={1} key={ingrediente.IngredienteID}>
             <ListItem>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <MdLocalDining size={"24px"} />
                  </Avatar>
                </ListItemAvatar>
               <Box display={'flex'} flexDirection={'column'} sx={{ width: '100%' }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }} component="h4">{`${ingrediente.Nombre || 'ingrediente X'} `}</Typography>
               <Typography variant="body1" color="initial">{`${ingrediente.Marca || 'Generico'} `}</Typography>
               </Box>
              
              </ListItemButton>

              <Grid2 container spacing={1} alignSelf={"flex"}>
                
                <IconButton edge="end" aria-label="delete">
                  <MdEdit />
                </IconButton>
                <IconButton edge="end" aria-label="edit">
                  <MdDelete />
                </IconButton>
              </Grid2>
            </ListItem>

            <Divider />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default IngredientesView;
