import { Request, Response } from "express";
import {
  registerNewUserService,
  authService,
  confirmAccount,
  forgotPasswordService,
  compareTokenService,
  newPasswordService,
} from "../services/Register.services";
import { RequestAuth } from "../interfaces/newAuth.interfaces";

const register = async (req: Request, res: Response) => {
  res.json({ message: "Hola desde aqui" });
};

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const response = await registerNewUserService(req.body);

    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const authUserR = async (req: Request, res: Response) => {
  try {
    const response = await authService(req.body);

    if (response instanceof Error) {
      return res
        .status(response.message === "User does not exist" ? 404 : 400)
        .json({ message: response.message });
    }
    console.log(response);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const confirmAccountC = async ({ params: { token } }: Request,res: Response) => {
  try {
    const response = await confirmAccount(token);

    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }

    if (response) {
      res.json({ message: "Account confirmed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async ({ body: { email } }: Request, res: Response) => {
  try {
    const response = await forgotPasswordService(email);

    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }

    if (response) {
      res.json({ message: "Email sent" });
    }
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async ({ params: { token } }: Request, res: Response) => {
  try {
    const response = await compareTokenService(token);

    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }

    if (response) {
      res.json({ message: "Token valid and user exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async ( { params: { token }, body: { password } }: Request,res: Response) => {
  try {
    const response = await newPasswordService(token, password);

    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }

    if (response) {
      res.json({ message: "Password updated" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userPerfil = async (req: RequestAuth, res: Response) => {
  try {
    res.json({ message: "Hola desde aqui", user: req.user });

    // res.json({message:"Hola desde aqui"})
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  registerNewUser,
  authUserR,
  confirmAccountC,
  forgotPassword,
  comparePassword,
  newPassword,
  userPerfil,
};
