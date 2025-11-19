const Task = require("../models/task.model");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
   
    const task = await Task.create({
      title,
      description,
      userId: req.user.userId
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get All Tasks of Logged In User
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Update Task
exports.updateTask = async (req, res) => {
    console.log("PUT request received");
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("User:", req.user);
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.userId},
      { title, description },
      { new: true }
    );

    res.json(updatedTask);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findOneAndDelete({ _id: id, userId: req.user.userId });

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
