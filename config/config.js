const mongoose = require("mongoose");

const config = async () => {
  try {
    await mongoose
      .connect("mongodb+srv://ravikumar:ravi123@cluster0.zeycrnj.mongodb.net/")
      .then(() => {
        console.log("connected to db");
      });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
    });
  }
};

config();
