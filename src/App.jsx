
import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Extras from "./components/Extras";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RealInvitations from "./components/RealInvitations";

export default function App() {
  // Tipo de celebración
  const [eventType, setEventType] = useState("boda");

  // Paquete seleccionado
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Complementos seleccionados
  const [selectedExtras, setSelectedExtras] = useState([]);

  // Cambiar entre bodas y XV años
  const handleEventChange = (newEventType) => {
    if (
      newEventType !== "boda" &&
      newEventType !== "xv"
    ) {
      return;
    }

    if (newEventType === eventType) {
      return;
    }

    setEventType(newEventType);

    // Reiniciar selección para evitar
    // mezclar precios de distintas celebraciones
    setSelectedPlan(null);
    setSelectedExtras([]);
  };

  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />

        {/* GALERÍA DE BODAS */}
        <Gallery />


        {/* PAQUETES */}
        <Pricing
          eventType={eventType}
          setEventType={handleEventChange}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        {/* COMPLEMENTOS */}
        <Extras
          eventType={eventType}
          selectedPlan={selectedPlan}
          selectedExtras={selectedExtras}
          setSelectedExtras={setSelectedExtras}
        />

        <RealInvitations />

        
      </main>

      <Footer />
    </div>
  );
}
