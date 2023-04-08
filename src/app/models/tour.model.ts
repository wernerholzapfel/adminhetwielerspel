import {ITeam} from './team.model';

export interface ITour {
  id: string;
  tourName?: string;
  startDate?: Date;
  endDate?: Date;
  deadline?: Date;
  isActive?: boolean;
  hasEnded?: boolean;
  teams?: ITeam[];
}

export interface AddTeamsRequest {
  tour: ITour;
  teams: {id: string}[];
}
