import { Router } from "express";
import { getProject, newProject,getProjectByID,updateProjectById } from "../controllers/projectController";
import checkAuth from '../middlewares/checkAuth'

const router = Router();

//ProjectRoute
//TODO: pls add the auth middleware 
router.route("/").get(checkAuth,getProject).post(checkAuth,newProject);

router.route("/:id").get(checkAuth,getProjectByID).put(checkAuth,updateProjectById)

export { router };
