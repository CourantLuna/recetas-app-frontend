import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

const CustomTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || ''); // Estado para la pestaña activa

  const handleChange = (event, newValue) => {
    setActiveTab(newValue); // Cambiar el estado según la pestaña seleccionada
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '15vh' }}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="dynamic tabs"
          centered
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3, // Espaciado interno
        }}
      >
        {/* Renderizar el contenido de la pestaña activa */}
        {tabs.map(
          (tab) =>
            activeTab === tab.value && (
              <React.Fragment key={tab.value}>{tab.content}</React.Fragment>
            )
        )}
      </Box>
    </Box>
  );
};

export default CustomTabs;
