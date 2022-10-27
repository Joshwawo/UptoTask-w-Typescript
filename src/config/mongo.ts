import "dotenv/config";

import { connect } from "mongoose";

// const dbConnect = async (): Promise<void> => {
//   const DB_URI = <string>process.env.DB_URI;
//   await connect(DB_URI);
// };

export const dbConnect = async (): Promise<void> => {
  try {
    const DB_URI = <string>process.env.DB_URI;
    const db = await connect(DB_URI);
    console.log(`Base de datos conectada: ${db.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};

// export default dbConnect;
