import { ITour } from "./tour.model";

export interface IHeadline {
  id?: string;
  title: string;
  text: string;
  createdDate?: Date;
  updatedDate?: Date;
  isActive: boolean;
  tour?: ITour;
}

