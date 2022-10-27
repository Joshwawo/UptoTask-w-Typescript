export interface ProjectInterface {
  name: string;
  description: string;
  deliveryDate: Date;
  client: string;
  creator: {};
  partners: [];
}

export interface UserProjectTypes {
    _id:object,
    name:string,
    password:string,
    email:string,
    confirmado:boolean,

}

