import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from "./pages/AdminPanel";
import EditorEtapasAvancado_Modular from "./pages/EditorEtapasAvancado_Modular";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/editor-personalizado" element={<EditorEtapasAvancado_Modular />} />
      </Routes>
    </Router>
  );
}

export default App;
