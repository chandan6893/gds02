const controller = require("../Controller/Contact")
const express = require("express")
const router = express.Router()

router.post("/addcontact",controller.AddContact)
router.put("/update/:id",controller.Update)
router.get("/getdata",controller.GetData)
router.post("/trash/:id",controller.Trash)
module.exports = router