"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import PrivateLayout from "../components/PrivateLayout";
import Home from "../components/Home";
import Page1 from "../components/Page1";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="page1" element={<Page1 />} />
        </Route>

        {/* Rutas Privadas */}
        <Route path="/private" element={<PrivateLayout />}>
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />
        </Route>
      </Routes>
    </Router>
  );
}
