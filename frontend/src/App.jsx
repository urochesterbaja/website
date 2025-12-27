import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sponsorship from "./pages/Sponsorship"
import Navbar from "./components/Nav"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import { HeroPropsMap } from "./components/HeroPropsMap"
import './App.css'

/* Layout function is here so whole function can be wrapped in BrowserRouter.
*  This is so the Hero can access the location of the site, allowing for modular component usage*/
function Layout() {
  const location = useLocation();
  let pageKey = location.pathname;
  return (
    <>
      <Navbar />
      <Hero {...HeroPropsMap[pageKey]}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sponsorship" element={<Sponsorship/>} />
      </Routes>
      <Footer />
    </>
  );
}

/* This is the actual "App" that gets returned to main.jsx and index.html */
function App() {
  return(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
};

export default App;
