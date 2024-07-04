// import React,{useState} from "react";
// import "./Style/Header.css";
// import {  NavLink } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoCloseSharp } from "react-icons/io5";
// import { PiShoppingCartSimpleBold } from "react-icons/pi";
// import { FaRegUser } from "react-icons/fa";

// import ReactGA from "react-ga4";
// const TRACKING_ID = "G-4BVCT6HLQG"

// import gdwlogo2 from "../Images/gdwlogo2.png";
// const Header = () => {
//   const [menuOpen,setMenuOpen]=useState(false);

// return (
//     <nav className="HeaderNav">
//       <div className="HeaderNavCompanyName">
//         <NavLink to="/">
//             <img className="healthconsultancyLogo" src={gdwlogo2} alt="LogoIcon" />
//         </NavLink>
//       </div>
//       <ul className={ menuOpen ? "open":"" }>
//         <li>
//           <NavLink to="/" onClick={()=>setMenuOpen(!menuOpen)}>HOME</NavLink>
//         </li>
//         <li>
//           <NavLink to = "https://shop.gdswellness.com/shop/" onClick={()=>setMenuOpen(!menuOpen,"SHOP")}  >SHOP  </NavLink>
//         </li>
//         <li>
//           <NavLink to="/about" onClick={()=>setMenuOpen(!menuOpen)}>ABOUT US</NavLink>
//         </li>
//         <li>
//           <NavLink to = "/contact" onClick={()=>setMenuOpen(!menuOpen)}  >CONTACT US</NavLink>
//         </li>

//         {/* user */}

//         <li>
//           <NavLink to = "/" onClick={()=>setMenuOpen(!menuOpen)}  ><FaRegUser style={{fontSize:"19px",fontWeight:"650",marginLeft:"1.3rem"}} /></NavLink>
//         </li>

//         <li>
//           <NavLink to = "https://shop.gdswellness.com/cart/" onClick={()=>setMenuOpen(!menuOpen)}  ><PiShoppingCartSimpleBold style={{fontSize:"22px",fontWeight:"650"}}  /></NavLink>
//         </li>

//       </ul>
//       <div className="HeaderNavHamburger" >
//         {!menuOpen ? <GiHamburgerMenu className="Hamburger"  onClick={()=>{setMenuOpen(!menuOpen)}}/> : <IoCloseSharp className="CloseIcon" onClick={()=>{setMenuOpen(!menuOpen)}}/>}

//       </div>
//     </nav>
//   );
// };

// export default Header;

// ***********************************NEW Codes************************

import React, { useState } from "react";
import "./Style/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

import gdwlogo2 from "../Images/gdwlogo2.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogin = () => {
    // Logic for handling login
    setIsLoggedIn(true);
    setMenuOpen(false); // Close the menu after login
  };

  const handleLogout = () => {
    // handling logout
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  return (
    <nav className="HeaderNav">
      <div className="HeaderNavCompanyName">
        <NavLink to="/">
          <img
            className="healthconsultancyLogo"
            src={gdwlogo2}
            alt="LogoIcon"
          />
        </NavLink>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(!menuOpen)}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="https://shop.gdswellness.com/shop/"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            SHOP
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(!menuOpen)}>
            ABOUT US
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setMenuOpen(!menuOpen)}>
            CONTACT US
          </NavLink>
        </li>

        {/* Conditional rendering based on login status */}
        {!isLoggedIn && (
          <li>
            <div
              className="user-dropdown"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >

              <NavLink to="/login"  className="user-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <FaRegUser style={{ fontSize: "19px", fontWeight: "650" }} />
              </NavLink>

            </div>
          </li>
        )}

        <li>
          <NavLink
            to="https://shop.gdswellness.com/cart/"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <PiShoppingCartSimpleBold
              style={{ fontSize: "22px", fontWeight: "650" }}
            />
          </NavLink>
        </li>

        {/* Conditional rendering of login/logout button */}
        {/* {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <button onClick={handleLogin}>Login</button>
          </li>
        )} */}
      </ul>
      <div className="HeaderNavHamburger">
        {!menuOpen ? (
          <GiHamburgerMenu
            className="Hamburger"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        ) : (
          <IoCloseSharp
            className="CloseIcon"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
