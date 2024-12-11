import React from "react";
import "./App.css"; // Importa los estilos

import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./Views/LayoutView";
import TabRececetaIngrediente from "./Views/TabsRecetaIngrediente";

const App = () => {
  return (
    <Router>
      <AppLayout>
        

        <TabRececetaIngrediente/>
      </AppLayout>
    </Router>
  );
};

export default App;
