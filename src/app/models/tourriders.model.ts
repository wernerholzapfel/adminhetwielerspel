import {ITeam} from './team.model';
import {IRider} from './rider.model';
import {ITour} from './tour.model';

export interface ITourrider {
  id: string;
  waarde: number;
  rider: IRider;
  tour?: ITour;
  team?: ITeam;
}

