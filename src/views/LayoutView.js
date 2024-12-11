import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* NavBar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Botón de Inicio (RecetasApp) */}
          <Button
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textTransform: 'none',
              padding: 0,
            }}
          >
            RECETASAPP
          </Button>

          {/* Botón de Perfil a la derecha */}
          <IconButton color="inherit" onClick={() => navigate('/perfil')}>
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1 ,
          padding: 3, // Espaciado interno
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box position={'static'}
        component="footer"
        sx={{
          textAlign: 'center',
          py: 2,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="body2">© 2024 RecetasApp by Heydi Garcia Sanchez - Todos los derechos reservados.</Typography>
      </Box>
    </Box>
  );
};

export default AppLayout;
