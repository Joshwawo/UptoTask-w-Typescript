import { Response, Request } from "express";
import newProjectModel from "../models/newProject";
import {
  RequestNvo,
  ReqPorject,
  _id,
  id,
} from "../interfaces/newAuth.interfaces";

import {
  getProjectServices,
  newProjectServices,
  getProjectBIdService,
} from "../services/proyect.services";

//TODO:move all this to services

const getProject = async (
  { user }: RequestNvo,
  res: Response
): Promise<void> => {
  const projects = await getProjectServices(user);
  res.json(projects);
};

const newProject = async ({ body, user }: RequestNvo, res: Response) => {
  try {
    const projectSaved = await newProjectServices(body, user);
    res.json(projectSaved);
  } catch (error) {
    console.log(error);
  }
};

//TODO: GET PROJECT BY ID

const getProjectByID = async ({ params, user }: RequestNvo, res: Response) => {
  
  const project = await getProjectBIdService(params.id, user._id);

  if (project instanceof Error) {
    return res.status(404).json({ message: project.message });
  }

  res.json(project);
};

const updateProjectById = async (req: RequestNvo, res: Response) => {
  res.json({ message: "Project updated" });
};
export { getProject, newProject, getProjectByID, updateProjectById };
