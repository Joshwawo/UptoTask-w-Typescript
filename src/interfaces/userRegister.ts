export interface UserRegister {
  name: string;
  password: string;
  email: string;
  token: string;
  confirmado: boolean;
  comprobarPassword(password: string): Promise<boolean>;
}

export interface userIdTypes {
  _id: string;
}
