const router = require("express").Router();
const User = require("../model/user");
const Tasks = require("../model/tasks");

// Create a new Task
router.post("/add", async (req, res) => {
  const { title, description, status, employee_id } = req.body;

  // checking register user
  const isEmployee = await User.findOne({ employee_id });
  if (!isEmployee) {
    return res.send({
      status: 400,
      message: "Employee not found",
    });
  }

  // checking Accessibility
  const isAdmin =
    isEmployee.employment_type === "Admin" ||
    isEmployee.employment_type === "Manager";
  if (!isAdmin) {
    return res.send({
      status: 400,
      message: "You are not authorized to add task",
    });
  }

  // checking the task already exists
  const isTaskExists = await Tasks.findOne({ title });
  if (isTaskExists) {
    return res.send({
      status: 400,
      message: "Task Already Exists",
    });
  }

  const task = new Tasks({
    title,
    description,
    status,
  });
  await task.save();

  res.send({
    status: 200,
    message: "Task added successfully",
  });
});

// Get all Tasks
router.get("/", async (req, res) => {
  const tasks = await Tasks.find();
  res.send({
    status: 200,
    data: tasks,
  });
});

// Get Task by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.findById(id);
  if (!task) {
    return res.send({
      status: 400,
      message: "Task not found",
    });
  }
  res.send({
    status: 200,
    data: task,
  });
});

// Update Task by id

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = await Tasks.findByIdAndUpdate(id, {
    title,
    description,
    status,
  });
  if (!task) {
    return res.send({
      status: 400,
      message: "Task not found",
    });
  }

  await task.save();
  res.send({
    status: 200,
    message: "Task updated successfully",
  });
});

// Delete Task by id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id } = req.body;

    // checking register user
    const isEmployee = await User.findOne({ employee_id });
    if (!isEmployee) {
      return res.send({
        status: 400,
        message: "Employee not found",
      });
    }

    // checking Accessibility
    const isAdmin =
      isEmployee.employment_type === "Admin" ||
      isEmployee.employment_type === "Manager";
    if (!isAdmin) {
      return res.send({
        status: 400,
        message: "You are not authorized to add task",
      });
    }

    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      return res.send({
        status: 400,
        message: "Task not found",
      });
    }
    res.send({
      status: 200,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
