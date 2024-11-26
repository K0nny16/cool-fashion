import { Navbar } from "./components/nav";
import { Footer } from "./components/footer";
import { Content } from "./components/content";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Resale } from "./components/resale";
import { AllItems } from "./components/Admin/AllItems";
import { Accessories } from "./components/accessories";
import { MaleShoes } from "./components/shoesMale";
import { ShoesFemale } from "./components/shoesFemale";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/allItems" element={<AllItems />} />
        <Route path="/Resale" element={<Resale />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/maleShoes" element={<MaleShoes />} />
        <Route path="/accessoriesMale" element={<Accessories />} />
        <Route path="/shoesFemale" element={<ShoesFemale />} />
        {/* Lägg till nya routes här för nyhter, dam skor, herr skor, osv*/}
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
