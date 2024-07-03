import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Sidenav1 from "./Component/sidenav";
import Overview from "./Component/Overview";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
// import { Login } from "./Component/Login";

export default function App() {
  const location = useLocation();
  const excludeRoutes = ["/", "/Signup"];
  const shouldRenderSidenav = !excludeRoutes.includes(location.pathname);

  // console.log("excludeRoutes",excludeRoutes);
  // console.log("shouldRenderSidenav",shouldRenderSidenav);
  // console.log("shouldRenderSidenav",shouldRenderSidenav)
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="App">
        {shouldRenderSidenav && (
          <div className="sidenav-container">
            <Sidenav1 />
          </div>
        )}
        <main>
          <Routes>
            {userData && (   <Route path="/dashboard" element={<Overview />} />)}
          
             <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </main>{" "}
      </div>
    </>
  );
}
