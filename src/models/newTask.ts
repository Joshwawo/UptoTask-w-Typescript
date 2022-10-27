import { Schema, model } from "mongoose";
import { taskInterface } from "../interfaces/taskInterface";

const TaskSchema = new Schema<taskInterface>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    deliveryDay: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    priority: {
      type: String,
      required: true,
      enum: ["Baja", "Media", "Alta"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "newProject",
    },
  },
  {
    timestamps: true,
  }
);

const newProjectSchema = model("newTask", TaskSchema);

export default newProjectSchema;
