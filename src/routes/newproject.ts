import { Router } from "express";
import { getProject, newProject,getProjectByID,updateProjectById,deleteProjectById,searchPartner,addPartner,deletePartner } from "../controllers/projectController";
import checkAuth from '../middlewares/checkAuth'

const router = Router();

//ProjectRoute
//TODO: pls add the auth middleware 
router.route("/").get(checkAuth,getProject).post(checkAuth,newProject);

router.route("/:id").get(checkAuth,getProjectByID).put(checkAuth,updateProjectById).delete(checkAuth,deleteProjectById);

//partnerRoute
//los :id son los id de los proyectos
router.post("/partner", checkAuth, searchPartner);
router.post("/partner/:id", checkAuth, addPartner);
router.post("/delete-partner/:id", checkAuth, deletePartner);



export { router };
