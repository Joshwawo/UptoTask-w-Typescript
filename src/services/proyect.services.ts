import newProjectModel from "../models/newProject";
import {NewUser as newUserModel} from '../models/newUser'
import { BodyProjectTypes } from "../interfaces/taskInterface";
import {UserProjectTypes} from '../interfaces/project.Interface'


type bodyPartner = {
  email: string, // se usa para el email del usuario para agregar como partner
  _id: string // se usa para el _id del usuario que se va a eliminar
}
type userPartner = {
  _id: string
}
const getProjectServices = async (user: string) => {
  //!Deprecated old way to do it 
  // const projects = await newProjectModel.find().where("creator").equals(user);
  const projects = await newProjectModel.find({
    '$or':
    [
      { 'creator': { $in : user} },
    {'partners' : {$in :user}}
  ]
  });
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
  const project = await searchProjectHelper(id);
  if (!project) {
    const error = new Error("Project not found");
    return error;
  }

  if(String(project.creator)  !== String(userId)
  && !project.partners.some((partner) => String(partner) === String(userId))
  ){
    const error = new Error("hey you cant see is site, forbidden");
    return error;
  }

  return project;
};


const updateProjectByIdService = async (id: string, body: BodyProjectTypes, user:userPartner) => {
  const project = await searchProjectHelper(id);
  if (!project) {
    const error = new Error("Project not found");
    return error;
  }

  if(String(project.creator) !== String(user._id)){
    const error = new Error("hey you cant edit is site, forbidden");
    return error;
  }

  project.name = body.name || project.name;
  project.description = body.description || project.description;
  project.client = body.client || project.client;
  project.deliveryDate = body.deliveryDay || project.deliveryDate;

  try {
    const projectUpdated = await project.save();
    return projectUpdated;
  } catch (error) {
    console.log(error)
  }
}

const deleteProjectByIdService = async (id: string, user:userPartner) => {
  const project = await searchProjectHelper(id);
  if (!project) {
    const error = new Error("Project not found");
    return error;
  }

  if(String(project.creator) !== String(user._id)){
    const error = new Error("hey you cant delete is proyect, forbidden");
    return error;
  }

  try {
    await newProjectModel.findByIdAndDelete(id);
    return 'Project deleted';
  } catch (error) {
    console.log(error)
  }
}

const searchPartnerService = async (body: bodyPartner) => {
  try {
    const users = await newUserModel.findOne({email: body.email}).select('-password -confirmado -__v -createdAt -updatedAt -token');
    if(!users) {
      const error = new Error('User not found');
      return error;
    }
    return users;
    
  } catch (error) {
    console.log(error)
  }
}

//partners section
const addPartnerService = async (id: string, body:bodyPartner, user:userPartner) => {
//body = body.email
//id = params.id
//user = req.user
  try {

    const project = await newProjectModel.findById(id);

    if(!project) {
      const error = new Error('Project not found');
      return error;
    }

    if(String(project.creator) !== String(user._id)){
      const error = new Error("hey you cant add partner, forbidden");
      return error;
    }

    const userQuery = await newUserModel.findOne({email: body.email}).select('-password -confirmado -__v -createdAt -updatedAt -token');

    if(!userQuery) {
      const error = new Error('User not found');
      return error;
    }
    if(String(project.creator) === String(userQuery._id)){
      const error = new Error("hey you cant add yourself");
      return error;
    }

    if(project.partners.includes(userQuery._id as never)){
      const error = new Error('User already added to the project');
      return error;
    }

    project.partners.push(userQuery._id as never);
    await project.save();

    return {
      message: 'Partner added to the project successfully',
    }
    
  } catch (error) {
    console.log(error)
  }
}

const deletePartnerService = async (id: string, body:bodyPartner, user:userPartner) => {
  //id = params.id
  //body = body.email
  //user = req.user
   const project:any = await newProjectModel.findById(id);

   if(!project) {
    const error = new Error('Project not found');
    return error;
    }

    if(String(project.creator) !== String(user._id)){
      const error = new Error("hey you cant delete partner, forbidden");
      return error;
    }

    //its ok you can delete the partner

    project.partners.pull(body._id as any);
    await project.save();
    return {
      message: 'Partner deleted successfully',
    }
}

//*Helpers funcions
const searchProjectHelper = async (id: string) => {
  try {
    const search = await newProjectModel.findById(id);
    if (!search) return;

    return search;
  } catch (error) {
    return null;
  }
};


export { getProjectServices, newProjectServices, getProjectBIdService,updateProjectByIdService,deleteProjectByIdService,addPartnerService,searchPartnerService,deletePartnerService };
