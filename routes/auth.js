const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

//getting env secret code

require("dotenv/config");

// creating jwt token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Post method fro new user credentials

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, employment_type, employee_id } = req.body;
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // checking if the employeeId already exists
    const existingEmployeeId = await User.findOne({ employee_id });
    if (existingEmployeeId) {
      return res.status(400).json({ message: "Employee Id Already Exists" });
    }
    // encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // creating a new user object
    const user = new User({
      name,
      email,
      password: hashedPassword,
      employment_type,
      employee_id,
    });
    // save user to database
    await user.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      message: "User created successfully",
      jwt_token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// making api for login users

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    // checking if email is valid
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    // checking password is match
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // creating jwt token
    const token = createToken(user._id);
    res.json({
      success: true,
      message: "User logged in successfully",
      jwt_token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
