import { Request, Response } from "express";
import {getConnection} from '../config/sqlConnection'

const getAllData = async (req: Request, res: Response) => {
  res.json({ message: "Hola desde el  controllador" });
};

const getUser =async (req:Request, res:Response) => {
    const pool = await getConnection()

    const respuesta = await pool?.request().query("SELECT * FROM usuarios")
    res.json(respuesta?.recordset)
}



export { getAllData, getUser };
