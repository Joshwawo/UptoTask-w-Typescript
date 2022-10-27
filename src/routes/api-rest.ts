import { Router } from "express";
import { getAllData,getUser } from "../controllers/apiRestController";
import checkAuth from '../middlewares/checkAuth'

const router = Router();

//TODO: Poner el middleware

router.get("/sql", getAllData);
router.get("/user", getUser)

export { router };
