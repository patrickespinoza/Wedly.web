import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Extras from "./components/Extras";
import PricingXV from "./components/PricingXV";
import GalleryXV from "./components/GalleryXV";

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Gallery />
      <GalleryXV/>

      <Pricing
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />

      <PricingXV
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