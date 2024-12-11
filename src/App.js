import React from "react";
import "./App.css"; // Importa los estilos

import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./views/LayoutView";
// import TabRececetaIngrediente from "./views/TabsRecetaIngrediente";
import CustomTabs from "./components/customTabs";
import RecetasViewCopy from "./views/RecetasView";
import IngredientesView from "./views/IngredientesView";
const App = () => {

  // Configuración de las pestañas
  const tabs = [
    {
      value: "recetas",
      label: "Recetas",
      content: <RecetasViewCopy />, // Vista para esta pestaña
    },
    {
      value: "ingredientes",
      label: "Ingredientes",
      content: <IngredientesView />, // Vista para esta pestaña
    },
  ];

  return (
    <Router>
      <AppLayout>
         {/* Renderiza las pestañas dinámicas */}
         <CustomTabs tabs={tabs} />

        {/* <TabRececetaIngrediente/> */}
      </AppLayout>
    </Router>
  );
};

export default App;
