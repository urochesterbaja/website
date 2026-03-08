import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {useState, useEffect } from "react"

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import { LoadingProvider } from "./LoadingContext";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"
import {useLoading} from "./LoadingContext";

import Home from "./pages/Home";
import News from "./pages/News";
import Sponsorship from "./pages/Sponsorship";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin/Admin";

import Navbar from "./components/Navbar/Nav";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";

import './App.css';


// AUTH0 api keys, since auth0 is token based it's fine to store them in frontend
// and they get injected here anyways lmao
const domain = "dev-egtfpxyws7b1h5f0.us.auth0.com";
const clientId = "bsbZYaC5kTmjhr7SKBdJ1u43WzEsQwyg";

// helper function that routes traffic through auth0 provider
// allows auth to be called for specific routes in RequireAuth()
export function Auth0ProviderNavigate({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://baja-api", //this is configured in the auth0 dash
        scope: "openid profile email"
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

// helper function that handles actual authorization
// the call to useAuth0() redirects to auth page
// then returns children once authentication happens
export function RequireAuth({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return children;
}

// used for nav, scrolls to sections with # as a path prefix
export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const { isLoading } = useLoading();

  useEffect(() => {
    if (hash && !isLoading) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash, isLoading]);

  return null;
}

/* Layout function is here so whole function can be wrapped in BrowserRouter.
*  This is so the Hero can access the location of the site, allowing for modular component usage */
function Layout() {
  const { showTransition, startLoading, stopLoading } = useLoading();
  const location = useLocation();
  let pageKey = location.pathname;

  const [contactInfo, setcontactInfo] = useState(null); //contact info for the footer (email, links, etc)
  const [heroInfo, setHeroInfo] = useState([])

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => stopLoading(), 500); //timer to set a minimum time for loading while db calls happen
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
            startLoading();
            fetch("/.netlify/functions/getContactInfo")
                .then(res => res.json())
                .then(data => setcontactInfo(data))
                .catch(err => console.error("Failed to fetch contactInfo", err))
                .finally(() => stopLoading());
    }, []);

  useEffect(() => {
            startLoading();
            fetch("/.netlify/functions/getHeroInfo")
              .then(res => res.json())
              .then(data => setHeroInfo(data))
              .catch(err => console.error("Failed to fetch heroInfo", err))
              .finally(() => stopLoading());
  }, []);

  const currentHero = heroInfo.find(h => h.path === pageKey);


  return (
    <>
      {showTransition && <LoadingScreen />}
      <ScrollToHash /> {/* putting this in here allows the scroll functionality to work */}
      <Navbar role="navigation"/>
      <Hero heroInfo = {currentHero}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/sponsorship" element={<Sponsorship/>} />
        <Route path="/results" element={<Results />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<RequireAuth> <Admin /> </RequireAuth>} /> {/* wrapping admin in <RequireAuth> forces auth redirect to access admin */}
      </Routes>
      {contactInfo && (<Footer footerInfo = {contactInfo} />)} {/* only render footer when db pull finishes*/}
    </>
  );
}

/* This is the actual "App" that gets returned to main.jsx and index.html */
function App() {
  return(
      <LoadingProvider>
        <BrowserRouter>
          <Auth0ProviderNavigate>
            <Layout />
          </Auth0ProviderNavigate>
        </BrowserRouter>
      </LoadingProvider>
  )
};

export default App;
