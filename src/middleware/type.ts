import { Request } from "express";

export interface IExtendedRequest extends Request {
  user?: {
    id: string;
    currentInstituteNumber: string | number;
  };
  instituteNumber?:string | number
}
