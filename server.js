const express = require("express");
const app = express();

const auth = require("./routes/auth");
const tasks = require("./routes/tasks");

app.use(express.json());

// connecting to database
require("./config/config");

app.use("/user", auth);
app.use("/tasks", tasks);

app.get("/", (req, res) => {
  res.send("For API Data Went to End Point ( / tasks / )  ");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
