const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/task.controllers");

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
