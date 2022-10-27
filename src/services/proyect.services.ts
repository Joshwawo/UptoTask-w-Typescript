import newProjectModel from "../models/newProject";
import { BodyProjectTypes } from "../interfaces/taskInterface";
import {UserProjectTypes} from '../interfaces/project.Interface'


const getProjectServices = async (user: string) => {
  const projects = await newProjectModel.find().where("creator").equals(user);
  return projects;
};

const newProjectServices = async (body: BodyProjectTypes, user: UserProjectTypes) => {
  // console.log(user);
  const project = new newProjectModel(body);
  const { _id } = user;

  // console.log(_id);
  project.creator = _id;

  try {
    const projectSaved = await project.save();
    return projectSaved;
  } catch (error) {
    console.log(error);
  }
};

const getProjectBIdService = async (id: string, userId: string) => {
  const project = await searchProject(id);
  if (!project) {
    const error = new Error("Project not found");
    return error;
  }

  if (String(project.creator) !== String(userId)) {
    const error = new Error("hey you cant visit is site, forbidden");
    return error;
  }

  return project;
};

//*Helpers funcions
const searchProject = async (id: string) => {
  try {
    const search = await newProjectModel.findById(id);
    if (!search) return;

    return search;
  } catch (error) {
    return null;
  }
};


export { getProjectServices, newProjectServices, getProjectBIdService };
