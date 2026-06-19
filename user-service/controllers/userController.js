const User = require("../models/User");

const Employee = require("../models/Employee");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const userExists = await User.findOne({ email });


        if (userExists) {

            return res.status(400).json({

                message: "User already exists"

            });

        }


        const salt = await bcrypt.genSalt(10);


        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });


        res.status(201).json({

            message: "User Registered"

        });


    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {

            return res.status(401).json({

                message: "Invalid Email"

            });

        }


        const isMatch = await bcrypt.compare(

            password,

            user.password

        );


        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid Password"

            });

        }


        const token = jwt.sign(

            {

                id: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );


        res.status(200).json({

            token

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

}

const addEmployee = async (req, res) => {
    try{
        const { employeeName, employeeId, employeeEmail, employeeDesignation} = req.body;

        if(!employeeName || !employeeId || !employeeEmail || !employeeDesignation){
            return res.json({
                message : "Please provide all the employee details"
            })
        }
        const newEmployee = await Employee.create({
            employeeName, employeeId, employeeEmail, employeeDesignation 
        })

        res.status(201).json({
            message: "Employee added successfully"
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const getProfile=(req,res)=>{

    res.json({

        message:"Welcome User",

        userId:req.user.id

    });

}

const getNames = async (req, res) => {
    res.json({
        message: "User Names",
        names: ["Alice", "Bob", "Charlie", "David"]
    }); 
}

const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}


module.exports = {registerUser, loginUser, getProfile, getNames,addEmployee, getEmployees}