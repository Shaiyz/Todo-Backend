const router = require("express").Router();
const { Task } = require("../models");

/**
 * @route		POST /task
 * @desc		Insert task records
 * @body		{ name ,subTasks}
 */

router.post("/", (req, res, next) => {
   Task.create(req.body)
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Task  Saved" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		GET /task
 * @desc		Fetch task records
 */

router.get("/", (req, res, next) => {
  let query = {};
  if ("_id" in req.query) query._id = req.query._id;
  if ("task" in req.query) query.task = req.query.task;

  Task.find(query)
    .exec()
    .then((doc) => {
      res.status(200).json({ data: doc });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		PUT /task/:task_id
 * @desc		Edit task records
 */

router.put("/:task_id", (req, res, next) => {
  Task.findByIdAndUpdate(req.params.task_id, req.body, { new: true })
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Task Changed" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		delete /task/:task_id
 * @desc		Del task records
 */

router.delete("/:task_id", (req, res, next) => {
  Task.findByIdAndDelete(req.params.task_id)
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Task Delete" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
