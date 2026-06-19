const express=require("express");

const router=express.Router();

const controllerData = require("../controllers/userController");

const protect=require("../middleware/authMiddleware");

router.post("/register",controllerData.registerUser);

router.post("/login",controllerData.loginUser);

router.get("/profile", protect, controllerData.getProfile);

router.get("/names", controllerData.getNames); 

router.post("/addEmployee", controllerData.addEmployee);

router.get("/getEmployees", controllerData.getEmployees);

module.exports=router;