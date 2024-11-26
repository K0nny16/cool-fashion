import { Navbar } from "./components/nav";
import {Footer} from "./components/footer";
import {Content} from "./components/content";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { SeAllaItems } from "./components/Admin/SeAllaItems";

function App() {
  return (
     <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Content/>}/>
          <Route path="/allItems" element={<SeAllaItems/>}/>
          {/* Lägg till nya routes här för nyhter, dam skor, herr skor, osv*/}
        </Routes>
        <Footer/>
     </Router>
  );
}

export default App;
