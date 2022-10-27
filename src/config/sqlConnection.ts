import sql, { config } from "mssql";

const dbConnect: config = {
  user: "josh",
  password: "lima9",
  server: "localhost",
  database: "testing",

  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const getConnection = async () => {
    try {
      const pool = await sql.connect(dbConnect);
      return pool;
    } catch (error) {
      console.log(error);
    }
  };
  // getConnection();
  
  export {getConnection, sql};
  