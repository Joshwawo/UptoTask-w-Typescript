import { Schema } from "mongoose";


export interface taskInterface {
  name: string;
  description: string;
  state: boolean;
  deliveryDay: Date;
  priority: Priority | string;
  project: Schema.Types.ObjectId | string | {} | any;
}

//Perdoname dioh mio por los any

export enum Priority {
  Baja = "Baja",
  Media = "Media",
  Alta = "Alta",
}

//!Para el typing de los servicios, es mejor usar interfaces, porque si usas clases, no puedes usar el extends, y eso es muy util para no repetir codigo, y para que los servicios sean mas legibles, y mas faciles de mantener.
export interface BodyProjectTypes {
  name: string;
  description: string;
  client: string;
}

export interface bodyTypesTask {
  name: string;
  description: string;
  priority: string;
  project: string;
  deliveryDay: Date;
}
