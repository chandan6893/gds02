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
              {/* <NavLink to="/" onClick={toggleMenu} className="user-icon">
                <FaRegUser style={{ fontSize: "19px", fontWeight: "650" }}  />
              </NavLink> */}
              <NavLink to="/registration"  className="user-icon">
                <FaRegUser style={{ fontSize: "19px", fontWeight: "650" }} />
              </NavLink>
              {/* {menuOpen && (
                <ul
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    width: "230px",
                    height: "160px",
                    backgroundColor: "lightyellow",
                    boxShadow:"box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    marginTop: "255px",
                    zIndex: "999",
                    transition: "all ease 0.5s",
                    borderRadius: "5px",
                    // zIndex:"-999"
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                  }}
                >
                  <li>
                    <NavLink
                      to="/signup"
                      style={{
                        backgroundColor: "#29ea11",
                        color: "white",
                        width: "130px",
                        padding: "4px 15px",
                        borderRadius: "5px",
                      }}
                    >
                      Sign In
                    </NavLink>
                  </li>

                  <li>
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      New Customer?
                    </span>
                    <NavLink
                      style={{
                        fontSize: "15px",
                        fontWeight: "450",
                        color: "darkblue",
                      }}
                      to="/registration"
                    >
                      Start here
                    </NavLink>
                  </li>
                </ul>
              )} */}
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
