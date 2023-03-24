const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status:{
      type:Boolean,
      default:false
    },
    description:{
      type: String,

    }
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
