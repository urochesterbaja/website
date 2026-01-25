import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News"
import Sponsorship from "./pages/Sponsorship"
import Results from "./pages/Results"
import Navbar from "./components/Navbar/Nav"
import Hero from "./components/Hero/Hero"
import Footer from "./components/Footer/Footer"
import { HeroPropsMap } from "./components/Hero/HeroPropsMap"
import './App.css'

/* Layout function is here so whole function can be wrapped in BrowserRouter.
*  This is so the Hero can access the location of the site, allowing for modular component usage*/
function Layout() {
  const location = useLocation();
  let pageKey = location.pathname;
  return (
    <>
      <Navbar />
      <Hero {...HeroPropsMap[pageKey]} key={pageKey}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/sponsorship" element={<Sponsorship/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>
      <Footer/>
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
