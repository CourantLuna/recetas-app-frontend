import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import RecetasView from './RecetasView';
import IngredientesView from './IngredientesView';

const TabsRecetaIngrediente = () => {
  const [activeTab, setActiveTab] = useState('recetas'); // Estado para controlar la pestaña activa

  const handleChange = (event, newValue) => {
    setActiveTab(newValue); // Cambiar el estado según la pestaña seleccionada
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '15vh' }}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="primary tabs example"
          centered
        >
          <Tab value="recetas" label="Recetas" />
          <Tab value="ingredientes" label="Ingredientes" />
        </Tabs>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3, // Espaciado interno
        }}
      >
        {/* Renderizar el contenido basado en la pestaña activa */}
        {activeTab === 'recetas' && <RecetasView />}
        {activeTab === 'ingredientes' && <IngredientesView />}
      </Box>
    </Box>
  );
};

export default TabsRecetaIngrediente;