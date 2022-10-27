import { Request, Response } from "express";
import newTaskModel from "../models/newTask";
import { RequestNvo, id, _id } from "../interfaces/newAuth.interfaces";
import {
  newTaskServices,
  getTaskServices,
  updateTaskService,
  deleteTaskService
} from "../services/tasks.services";

const addTasks = async ({ body, user }: RequestNvo, res: Response) => {
  const task = await newTaskServices(body, user);

  if (task instanceof Error) {
    return res.status(404).json({ message: task.message });
  }

  // const respuesta = await newTaskServices();
  res.json(task);
};

const getTask = async (req: RequestNvo, res: Response) => {
  // console.log(req.params.id)
  const task = await getTaskServices(req.params.id, req.user._id);

  if (task instanceof Error) {
    return res.status(400).json({ message: task.message });
  }

  // console.log(task);
  res.json(task);
};

const updateTask = async ({ user, body,params: { id } }: RequestNvo,res: Response) => {
  const task = await updateTaskService(id, body,user);

  if (task instanceof Error) {
    return res.status(400).json({ message: task.message });
  }

  res.json(task);
};

const deleteTask =async ({params:{id},user}:RequestNvo, res:Response) => {

  const task = await deleteTaskService(id,user)

  if(task instanceof Error){
    return res.status(400).json({message: task.message})
  }

  res.json(task)

  
  
}

export { addTasks, getTask, updateTask,deleteTask };
