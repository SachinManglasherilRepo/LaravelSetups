const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    console.log(req.body);

    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }

    //check user

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "user already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    //create new user
    const newuser = await userModel.create({
      userName,
      email,
      password: hashPassword,
      address,
      phone,
    });
    res.status(201).send({
      status: "success",
      message: "User registered Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      sucess: false,
      message: "error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please provide email and password",
      });
    }

    //check user

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "NOt a Valid user ",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "password is incorrect",
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(200).send({
        success: true,
        message: "User Logged in Successfully",
        token,
        user,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { registerController, loginController };
