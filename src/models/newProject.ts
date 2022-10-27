import { model, Schema } from "mongoose";
import { ProjectInterface } from "../interfaces/project.Interface";

const ProjectSchema = new Schema<ProjectInterface>(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    deliveryDate: {
      type: Date,
      default: Date.now(),
      require: false,
    },
    client: {
      type: String,
      trim: true,
      required: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
    },
    partners: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const newProjectSchema = model("newProject", ProjectSchema);
export default newProjectSchema;
