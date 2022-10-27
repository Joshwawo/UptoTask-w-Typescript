import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.JTW_SECRET)

const JTW_SECRET = process.env.JTW_SECRET