import { Schema, model } from "mongoose";
import { UserRegister } from "../interfaces/userRegister";
import bcrypt from "bcryptjs";

const newUserSchema = new Schema<UserRegister>(
  {
    name: {
      type: String,
      require: false,
      trim: true,
    },
    password: {
      type: String,
      requiere: false,
      trim: true,
    },
    email: {
      type: String,
      requiere: false,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

newUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// newUserSchema.methods.comprobarPassword = async function (passwordFormulario:string) {
//   return await bcrypt.compare(passwordFormulario, this.password);
// }

newUserSchema.methods.comprobarPassword = async function (passwordFormulario:string) {
  return await bcrypt.compare(passwordFormulario, this.password);
};


const NewUser = model("NewUser", newUserSchema);
export  {NewUser};
