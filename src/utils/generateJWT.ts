import jwt from "jsonwebtoken";

const generateJWT = (id: object) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: "30d",
  });
};

export default generateJWT;
