import { ITourrider } from "./tourriders.model";

export interface ITeam {
  id: string;
  teamName: string;
  teamNameShort: string;
  country: string;
  teamAbbreviation: string;
  tourRiders: ITourrider[];
  selected?: boolean;
}
