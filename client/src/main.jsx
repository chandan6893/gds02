import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// SSR

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

if (rootElement?.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}


// CSR
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
