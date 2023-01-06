import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import {router} from './routes'
import {dbConnect} from './config/mongo'

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

dbConnect()

app.use(router)

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})

//TODO: Add socket.io or not