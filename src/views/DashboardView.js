// views/DashboardView.js
import React from "react";
import { Box, Typography } from "@mui/material";
import AppLayout from "../views/LayoutView";
import CustomTabs from "../components/customTabs";
import RecetasViewCopy from "../views/RecetasView";
import IngredientesView from "../views/IngredientesView";

const DashboardView = () => {

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
    <AppLayout>
    {/* Renderiza las pestañas dinámicas */}
    <CustomTabs tabs={tabs} />
  </AppLayout>
  );
};

export default DashboardView;
