import { verify } from "jsonwebtoken";
import {Response, NextFunction } from "express";
import NewUserModel from "../models/NewUser";
import {id, RequestNvo} from '../interfaces/newAuth.interfaces'


const checkAuth = async (req: RequestNvo, res: Response, next: NextFunction) => {
  let token:string | undefined ;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verify(token, String(process.env.JWT_SECRET));
      req.user = await NewUserModel.findById({
        _id: (decoded as id).id,
      }).select("-password, -confirmado, -token -__v -createdAt -updatedAt");
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Your JsonWebToken, not valid" });
    }
  }
  if (!token) {
    const error = new Error("No token, authorization denied");
    return res.status(401).json({ message: error.message });
  }
  next();
};

export default checkAuth;
