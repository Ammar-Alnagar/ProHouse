import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Properties from "./pages/Properties";
import DevelopersPage from "./pages/DevelopersPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/developers" element={<DevelopersPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
