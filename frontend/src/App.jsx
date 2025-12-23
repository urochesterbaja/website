import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Nav"
import Hero from "./components/Hero"
import { HeroPropsMap } from "./components/HeroPropsMap"
import './App.css'

function Layout() {
  const location = useLocation();
  let pageKey = location.pathname;
  return (
    <>
      <Navbar />
      <Hero {...HeroPropsMap[pageKey]}/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      
    </>
  );
}

function App() {
  return(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
};

export default App;
