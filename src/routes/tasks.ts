import { Router } from "express";
import { addTasks,getTask,updateTask,deleteTask,changeStatusTask } from "../controllers/tasksController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.post("/", checkAuth, addTasks);
router.route("/:id").get(checkAuth,getTask).put(checkAuth,updateTask).delete(checkAuth,deleteTask)
router.post("/status/:id", checkAuth, changeStatusTask);


export { router };
