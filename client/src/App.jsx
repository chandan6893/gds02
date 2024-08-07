import React, { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { RiLoader4Fill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import ReactGA from "react-ga4";
import ShippingPolicy from "./Components/ShippingPolicy/ShippingPolicy";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
// const TRACKING_ID = "G-4BVCT6HLQG"
const TRACKING_ID = "G-PJ3ERX3LDC"
ReactGA.initialize(TRACKING_ID);

// Import components using dynamic import for code splitting
const Home = React.lazy(() => import("./Components/Home/Home"));
const Contact = React.lazy(() => import("./Components/Contact/Contact"));
const About = React.lazy(() => import("./Components/About/About"));
const PrivacyPolicy = React.lazy(() => import("./Components/PrivacyPolicy/PrivacyPolicy"));
const ReturnPolicy = React.lazy(() => import("./Components/ReturnPolicy/ReturnPolicy"));
const TermsAndConditions = React.lazy(() => import("./Components/TC/TermsAndConditions"));
const Error = React.lazy(() => import("./Components/Error/Error"));

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Header />
      <Suspense fallback={ <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"90vh"}}><RiLoader4Fill style={{color:"darkblue",fontSize:"8rem"}} /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/policy/ReturnPolicy" element={<ReturnPolicy />} />
          <Route path="/policy/ShippingPolicy" element={<ShippingPolicy />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/registration" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;

