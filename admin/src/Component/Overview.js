import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import Header from "./Header";
import DataTable from "react-data-table-component";
import TimeRangePicker from './timepicker';

const endPoints  = "https://gdswellness-1.onrender.com";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "80vh",
  overflowY: "auto",
  textAlign: "justify",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ContactDetails() {
  const [CDeatils, setCDeatils] = useState([]);
  const [SelectedData, setSelectedData] = useState([]);
  const [EditData, setEditData] = useState([]);
  const [isEditable, setisEditable] = useState(false);
  const [Data, setData] = useState([])
  const [SDate, setSDate] = useState({
    start: "",
    end: "",
    starttime:"",
    endtime:""
  });
 
console.log(SDate,"SDate");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState(false);
  const [Preview, setPreview] = useState(false);

  const handleViewFullMessage = (message) => {
    setOpen(true);
    setMessage(message);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone Number", selector: (row) => row.phone },
    {
      name: "Date",
      selector: (row) => moment(row.createdAt).format("DD-MM-YY")
    },
    {
      name: "Contacted At",
      selector: (row) => moment(row.createdAt).format("hh:mm A")
    },
    {
      name: "Message",
      selector: (row) => (
        <p className="message">
          {row.message.length > 500 ? `${row.message.slice(0, 500)}...` : row.message}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <p style={{ cursor: "pointer", marginRight: "15px", color: "red" }} onClick={() => handleDeleteSingle(row._id)}>Delete</p>
          <p style={{ cursor: "pointer", marginRight: "5px", color: "skyblue" }} onClick={() => handleViewFullMessage(row)}>View</p>
          {/* <p style={{ cursor: "pointer", marginRight: "5px", color: "green" }} onClick={() => handleEdit(row)}>Edit</p> */}
        </>
      ),
    },
  ];

  const handleInfo = async () => {
    try {
      const data = [
        ["Name", "Email", "Phone", "Message"],
        ...SelectedData.map((ele) => [ele.name, ele.email, ele.phone, ele.message]),
      ];
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const handleEdit = (data) => {
    setEditData(data);
    setisEditable(true);
  };

  const handleDeleteSingle = async (id) => {
    try {
      // let response = await axios.post(`https://ibabackend.onrender.com/api/contact/trash/${id}`);
      let response = await axios.post(`${endPoints}/api/contact/trash/${id}`);
      if (response.status === 200) {
        setCDeatils(CDeatils.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      let deletedCount = 0;
      for (let data of SelectedData) {
        // let response = await axios.post(`https://ibabackend.onrender.com/api/contact/trash/${data._id}`);
        let response = await axios.post(`${endPoints}/api/contact/trash/${data._id}`);
        if (response.status === 200) {
          deletedCount++;
        }
      }
      setCDeatils(CDeatils.filter((item) => !SelectedData.includes(item)));
      setSelectedData([]);
      setPreview(false);
      if (deletedCount > 0) {
        alert(`${deletedCount} contacts deleted successfully.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcontact();
  }, [SDate]);

  const getAllcontact = async () => {
    try {
      // let response = await axios.get("https://ibabackend.onrender.com/api/contact/getdata");
      let response = await axios.get(`${endPoints}/api/contact/getdata`);
      if (response.status === 200) {
        setCDeatils(response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSelecteRow = (state) => {
    setSelectedData(state.selectedRows);
  };

  const handlechangeData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditContact = async () => {
    try {
      // let response = await axios.put(`https://ibabackend.onrender.com/api/contact/update/${EditData._id}`, Data);
      let response = await axios.put(`${endPoints}/api/contact/update/${EditData._id}`, Data);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("error", error);
    }
  };
 
  const filterDateswise = (data) => {
    return data?.filter((item) => {
      const createdAtMoment = moment(item?.createdAt);
      const selectedStartDate = SDate.start ? moment(SDate.start, "YYYY-MM-DD") : null;
      const selectedEndDate = SDate.end ? moment(SDate.end, "YYYY-MM-DD") : null;
  
     
      const startTimeMoment = SDate.start && SDate.starttime ? moment(`${SDate.start} ${SDate.starttime}`, "YYYY-MM-DD HH:mm") : null;
      const endTimeMoment = SDate.end && SDate.endtime ? moment(`${SDate.end} ${SDate.endtime}`, "YYYY-MM-DD HH:mm") : null;
  
    
      if (selectedStartDate && !createdAtMoment.isSameOrAfter(selectedStartDate, "day")) {
        return false;
      }
  
      if (selectedEndDate && !createdAtMoment.isSameOrBefore(selectedEndDate, "day")) {
        return false;
      }
  
     
      if (startTimeMoment && endTimeMoment) {
        if (!createdAtMoment.isBetween(startTimeMoment, endTimeMoment, null, "[]")) {
          return false;
        }
      }
  
      return true;
    });
  };

  const filteredData = filterDateswise(CDeatils);
  
  

 useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      window.location.assign("/");
    } 
  }, []);


  return (
    <>
      <Header />
      {!isEditable ? (
        <>
          {open ? (
            <div className="row p-4">
              <div className="col-md-1 ">
                <img width={30} onClick={() => setOpen(false)} style={{ cursor: "pointer" }} height={30} src="../Assests/icons8-go-back-26.png" />
              </div>
              <div className="row">
                <p className="col-md-4 me-0 textbold ">
                  {Message.name}
                </p>

                <p className="col-md-8 text-end me-0 textbold ">

                  <span className="mx-2"> At {moment(Message.createdAt).format("hh:mm A")}</span>
                </p>
                <p className="col-md-12 message1" >{Message.message}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="row m-auto">
                <div className="col-md-2">
                  <label className="fw-bold">Select Date</label>
                  <input className="col-md-12 mb-2 shadow" type="date" onChange={handleChange} name="start" />
                </div>
                <div className="col-md-2">
                  <label className="fw-bold">End Date</label>
                  <input className="col-md-12 mb-2 shadow" type="date"
                    name="end" onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="fw-bold">From</label>
                  <input className="col-md-12 mb-2 shadow" type="time"
                    name="starttime" onChange={handleChange} />
                </div>
                <div className="col-md-2">
                  <label className="fw-bold">To</label>
                  <input className="col-md-12 mb-2 shadow" type="time"
                    name="endtime" onChange={handleChange} />
                </div>
                <div className="col-md-2 mt-4">
                  {SelectedData.length > 0 && (
                    <button className="row m-auto p-2" style={{ border: "none", backgroundColor: "red", color: "white", borderRadius: "6px" }} onClick={() => setPreview(true)}>
                      Delete
                    </button>
                  )}
                </div>
                <div className="col-md-2 mt-4">
                  {SelectedData.length > 0 && (
                    <button className="row m-auto p-2" style={{ border: "none", backgroundColor: "blue", color: "white", borderRadius: "6px" }} onClick={handleInfo}>
                      Download
                    </button>
                  )}
                </div>
              </div>
              <DataTable title="" columns={columns} data={filteredData} theme="solarized" selectableRows onSelectedRowsChange={handleSelecteRow} pagination={filteredData.length > 6} />
              <Modal open={Preview} onClose={() => setPreview(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <h5>Are you sure you want to delete the following contacts?</h5>
                  <ul>
                    {SelectedData.map((data) => (
                      <div key={data._id}>
                        <h4>{data.name}</h4>
                        <p>{data.message}</p>
                      </div>
                    ))}
                  </ul>
                  <Button variant="contained" style={{ marginRight: "10px" }} onClick={() => setPreview(false)}>Cancel</Button>
                  <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                </Box>
              </Modal>
            </>
          )}
        </>
      ) : (
        <div className="row">
          <div className="col-md-4 mt-5 p-4 m-auto shadow">
            <input className="col-md-12 mb-2" name="name" defaultValue={EditData.name} onChange={handlechangeData} />
            <input className="col-md-12 mb-2" name="phone" defaultValue={EditData.phone} onChange={handlechangeData} />
            <input className="col-md-12 mb-2" name="email" defaultValue={EditData.email} onChange={handlechangeData} />
            <input className="col-md-12 mb-2" name="message" defaultValue={EditData.message} onChange={handlechangeData} />
            <div className="row">
              <button className="col-md-3 m-auto" style={{ border: "none", marginRight: "10px", backgroundColor: "green" }} onClick={handleEditContact}>Save</button>
              <button className="col-md-3" style={{ border: "none" }} onClick={() => setisEditable(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
