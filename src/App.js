import { Navbar } from "./components/nav";
import { Footer } from "./components/footer";
import { Content } from "./components/content";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Resale } from "./components/resale";
import { AllItems } from "./components/Admin/AllItems";
import { Accessories } from "./components/accessories";
import { MaleShoes } from "./components/shoesMale";
import { ShoesFemale } from "./components/shoesFemale";
import { AddCategory } from "./components/Admin/addCategory";
import { EditItems } from "./components/editItems";
import { AddItems } from "./components/Admin/AddItems";
import { LoginPage } from "./components/loginpage";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar userState={user} />
      {console.log(user)}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/allItems" element={<AllItems />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/Resale" element={<Resale />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/maleShoes" element={<MaleShoes />} />
        <Route path="/accessoriesMale" element={<Accessories />} />
        <Route path="/shoesFemale" element={<ShoesFemale />} />
        <Route path="/editItem" element={<EditItems />} />
        <Route path="/addItems" element={<AddItems />} />
        <Route path="/loginPage" element={<LoginPage setUser={setUser} />} />
        {/* Lägg till nya routes här för nyhter, dam skor, herr skor, osv*/}
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
