import newTaskModel from "../models/newTask";
import newProjectModel from "../models/newProject";
import {userIdTypes} from '../interfaces/userRegister'
import {bodyTypesTask} from '../interfaces/taskInterface'



const newTaskServices = async (body: bodyTypesTask, user: userIdTypes) => {
  const { project } = body;

  const projectExists = await searchProject(project);

  if (!projectExists) {
    const error = new Error("This project does not exits");
    return error;
  }

  if (String(projectExists.creator) !== String(user._id)) {
    const error = new Error(
      "You do not have the permissions to add tasks to this project"
    );
    return error;
  }

  try {
    const taskStored = await newTaskModel.create(body);
    //store the task in the project
    projectExists.tasks.push(taskStored._id as never);
    await projectExists.save();
    return taskStored;
  } catch (error) {
    console.log(error);
  }

  return projectExists;
};


const getTaskServices = async (id: string, user: userIdTypes) => {
  //?En esta parte en vez de hacer dos consultas, uso este metodo de mongoose, llamado populate para juntar el modelo de proyecto, (eso creo)
  // console.log(user._id);
  const task = await searchTask(id);
  if (!task) {
    const error = new Error("This project does not exits");
    return error;
  }

  if (String(task?.project.creator) !== String(user._id)) {
    const error = new Error("You do not have the permissions to see this task");
    return error;
  }

  return task;
};

const updateTaskService = async (id: string, body: bodyTypesTask, user: userIdTypes) => {
  //?En esta parte en vez de hacer dos consultas, uso este metodo de mongoose, llamado populate para juntar el modelo de proyecto, (eso creo)
  console.log(body)
  const task = await searchTask(id);

  console.log(body);

  if (!task) {
    const error = new Error("This project does not exits");
    return error;
  }

  if (String(task?.project.creator) !== String(user._id)) {
    const error = new Error("You do not have the permissions to see this task");
    return error;
  }

  task.name = body.name || task.name;
  task.description = body.description || task.description;
  task.priority = body.priority || task.priority;
  task.deliveryDay = body.deliveryDay || task.deliveryDay;

  try {
    const taskStored = await task.save();
    return taskStored;
  } catch (error) {
    console.log(error);
  }

  return task;
};


const deleteTaskService = async (id: string, user: userIdTypes) => {
  const task = await searchTask(id);

  if (!task) {
    const error = new Error("This project does not exits");
    return error;
  }

  if (String(task?.project.creator) !== String(user._id)) {
    const error = new Error("You do not have the permissions to see this task");
    return error;
  }

  try {
  //  const taskDeleted = await newTaskModel.findByIdAndDelete(id);
    const project:any = await newProjectModel.findById(task?.project._id);
    project?.tasks?.pull(id);
    await Promise.allSettled([project?.save(), await newTaskModel.findByIdAndDelete(id)]);
    return {
      message: "Task deleted",
      taskDeletedId: task?._id,
    }
  } catch (error) {
    console.log(error);
  }

  return task;
};

const changeStatusTaskService = async (id: string, user: userIdTypes) => {
  const task = await searchTaskState(id);

  if (!task) {
    const error = new Error("This task does not exits");
    return error;
  }

  if(String(task.project.creator) !== String(user._id) 
  && !task.project.partners.some((partner: any) => String(partner._id) === String(user._id))){
    const error = new Error("You do not have the permissions to see this task");
    return error;
  }

  task.state = !task.state;
  task.completed = task.state ? user._id : null;

  

  try {
    await task.save();
    const taskStored = await searchTaskState(id);
    return taskStored;
  } catch (error) {
    console.log(error);
  }

  return task;
}

//*Funtions helper
const searchProject = async (id: string) => {
  try {
    const search = await newProjectModel.findById(id);
    if (!search) return;

    return search;
  } catch (error) {
    return null;
  }
};
const searchTask = async (id: string) => {
  try {
    const search = await newTaskModel.findById(id).populate("project");
    if (!search) return;

    return search;
  } catch (error) {
    return null;
  }
};
const searchTaskState = async (id: string) => {
  try {
    const search = await newTaskModel.findById(id).populate("project").populate("completed");
    if (!search) return;

    return search;
  } catch (error) {
    return null;
  }
};

export {
  newTaskServices,
  getTaskServices,
  updateTaskService,
  deleteTaskService,
  changeStatusTaskService,
};
