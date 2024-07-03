// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TabsTitle from "../Utils/TabsTitle";
// import axios from "axios";
// import emailjs from "emailjs-com";
// import * as Yup from "yup";
// import ReactGA from "react-ga4";

// import "./Style/Contact.css";

// const TRACKING_ID = "G-PJ3ERX3LDC";

// const Contact = () => {
//   useEffect(() => {
//     if (!window.ga) {
//       ReactGA.initialize(TRACKING_ID);
//     }
//     ReactGA.send({ hitType: "pageview", page: "/contact", title: "Contact" });
//   }, []);

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     name: "",
//     phone: "", // Changed from "Phone" to "phone" for consistency
//     message: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     phone: Yup.string()
//       .matches(/^\d{10}$/, "Phone number must be 10 digits")
//       .required("Phone number is required"),
//     email: Yup.string().required("Email is required").email("Invalid email format"),
//     message: Yup.string().required("Message is required"),
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await validationSchema.validate(formData, { abortEarly: false });

//       const config = {
//         url: "/contact/addcontact",
//         // baseURL: "http://localhost:8000/api",
//         baseURL: "https://gdswellness-1.onrender.com/api",
//         method: "post",
//         headers: { "Content-type": "application/json" },
//         data: {
//           email: formData.email,
//           name: formData.name,
//           phone: formData.phone,
//           message: formData.message,
//         },
//       };

//       const response = await axios(config);

//       if (response.status === 200) {
//         emailjs
//           .sendForm(
//             "service_0c4e5dw",
//             "template_mur6j98",
//             e.target,
//             "Q7nXQWJ2D9APCTJs_"
//           )
//           .then(
//             () => {
//               console.log("SUCCESS!");
//             },
//             (error) => {
//               console.log("FAILED...", error.text);
//             }
//           );
//         alert("Message sent successfully");
//         // Consider redirecting the user or showing a success message instead of reloading
//         window.location.reload();
//       }
//     } catch (error) {
//       if (error instanceof Yup.ValidationError) {
//         const newErrors = {};
//         error.inner.forEach((err) => {
//           newErrors[err.path] = err.message;
//         });
//         setErrors(newErrors);
//       }
//     }
//   };

//   const handleGoogleEvent = (platform) => {
//     ReactGA.event({
//       category: "Contact Us Submit Button",
//       action: "Click",
//       label: platform,
//     });
//   };

//   return (
//     <div className="Contact ContactBackImg">
//       <div className="ContactWrapper">
//         <h1>
//           <span onClick={() => navigate("/")}>Home</span>/<span>Contact Us</span>
//         </h1>

//         <form onSubmit={handleSubmit}>
          
//           <div>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           {errors.name && <p className="ContactError">{errors.name}</p>}
//           </div>

//           <div>
//           <label htmlFor="phone">Phone</label>
//           <input
//             type="text"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//           {errors.phone && <p className="ContactError">{errors.phone}</p>}
//           </div>


//           <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           {errors.email && <p className="ContactError">{errors.email}</p>}
//           </div>

//           <div>
//           <label htmlFor="message">Message</label>
//           <textarea
//             name="message"
//             id="message"
//             cols="30"
//             rows="2"
//             value={formData.message}
//             onChange={handleInputChange}
//           ></textarea>
//           {errors.message && <p className="ContactError">{errors.message}</p>}
//           </div>

//           <div className="ContactRecaptchaAndSubmitBtn">
//             <button
//               type="submit"
//               className="ContactSubmitBtn"
//               onClick={() => handleGoogleEvent("contactUs")}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;


// New Contac
import React, { useState, useEffect} from "react";
import axios from "axios";
// import "./Style/ContactUs.css";
import { TextField, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import * as Yup from "yup";

import ReactGA from "react-ga4";
import "./Style/Contact.css";
const TRACKING_ID = "G-PJ3ERX3LDC";
const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    Phone: "",
    message: ""
  });


  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    Phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    message: Yup.string().required("Message is required"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    
  };

    useEffect(() => {
    if (!window.ga) {
      ReactGA.initialize(TRACKING_ID);
    }
    ReactGA.send({ hitType: "pageview", page: "/contact", title: "Contact" });
  }, []);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const config = {
        url: "/contact/addcontact",
        // baseURL: "http://localhost:8000/api",

        baseURL: "https://gdswellness-1.onrender.com/api",
        method: "post",
        headers: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          name: formData.name,
          phone: formData.Phone,
          message: formData.message
        },
      };

      let response = await axios(config);

      if (response.status === 200) {
        emailjs
          .sendForm('service_0c4e5dw', 'template_mur6j98', e.target, 'Q7nXQWJ2D9APCTJs_')
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            }
          );
        alert("Message sent successfully");
        window.location.reload()
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

    const handleGoogleEvent = (platform) => {
    ReactGA.event({
      category: "Contact Us Submit Button",
      action: "Click",
      label: platform,
    });
  };

  return (
    <Container maxWidth="sm" className="ContactContainer">
      <div className="aboutUsContainer01_01">
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            className="AboutUs_Container_01_Home"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span>{" / "}</span>
          <span className="AboutUs_Container_01_About">Contact Us</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3.5}>
          <Grid item xs={12}>
            <TextField
              value={formData.name}
              onChange={handleInputChange}
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
            />
    
          {errors.name && <p className="ContactError">{errors.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
 
        {errors.email && <p className="ContactError">{errors.email}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.Phone}
              onChange={handleInputChange}
              name="Phone"
              label="Phone"
              variant="outlined"
              fullWidth
            />

        {errors.Phone && <p className="ContactError">{errors.Phone}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.message}
              onChange={handleInputChange}
              name="message"
              label="Message"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
            />
  
        {errors.message && <p className="ContactError">{errors.message}</p>}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                background: "#29ea11",
                width: "7.5rem",
                textAlign: "center",
              }}
              onClick={() => handleGoogleEvent("contactUs")}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUs;