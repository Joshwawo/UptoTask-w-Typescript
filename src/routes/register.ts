import { Router } from "express";
import {
  register,
  registerNewUser,
  authUserR,
  confirmAccountC,
  forgotPassword,
  comparePassword,
  newPassword,
    userPerfil,
} from "../controllers/userController";
import checkAuth from '../middlewares/checkAuth'



const router = Router();

router.get("/", register);

//Estas si importan
router.post("/", registerNewUser);
router.post("/login", authUserR);
router.get("/confirm/:token", confirmAccountC);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(comparePassword).post(newPassword);

//Auth routes
router.get("/perfil",checkAuth,userPerfil )


export { router };
