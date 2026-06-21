import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Extras from "./components/Extras";

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Gallery />

      <Pricing
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />

      <Extras
        selectedPlan={selectedPlan}
        selectedExtras={selectedExtras}
        setSelectedExtras={setSelectedExtras}
      />

      <Contact />
      <Footer />
    </div>
  );
}

export default App;