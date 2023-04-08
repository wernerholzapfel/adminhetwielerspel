import {ITeam} from './team.model';
import { ITour } from './tour.model';

export interface IRider {
  id: string;
  firstName: string;
  firstNameShort: string;
  initials: string;
  surName: string;
  nationality: string;
  surNameShort: string;
  dateOfBirth: string;
  isActive: boolean;
  isBeschermdeRenner?: boolean;
  isMeesterknecht?: boolean;
  isLinkebal?: boolean;
  isWaterdrager?: boolean;
  isRenner?: boolean;
  isSelected?: boolean;
  isOut?: boolean;
  position?: number;
  team?: ITeam;
}

export interface AddRidertoTeam {
    team?: ITeam,
    tour: ITour,
    waarde: number,
    rider?: IRider
}
