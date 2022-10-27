import {Router, Request, Response} from 'express';
import {PrismaClient} from '@prisma/client'

const router = Router()

const prima = new PrismaClient()

router.get("/", async(req:Request, res:Response)=>{

//   const getUsuarios = await prima.usuario.findMany()
//   console.log(getUsuarios)
    
    res.json({
        message: "Hola desde sql server"
    })
})





export{
    router
}