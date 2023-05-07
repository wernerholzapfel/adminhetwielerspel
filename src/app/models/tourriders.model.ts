import {ITeam} from './team.model';
import {IRider} from './rider.model';
import {ITour} from './tour.model';
import { IEtappe } from './etappe.model';

export interface ITourrider {
  id: string;
  waarde: number;
  rider: IRider;
  tour?: ITour;
  team?: ITeam;
  isOut?: boolean
  latestEtappe?: IEtappe
}

