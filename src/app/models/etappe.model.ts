import {ITour} from './tour.model';
import { ITourrider } from './tourriders.model';

export interface IEtappe {
  id?: string;
  etappeNumber?: number;
  etappeName?: string;
  date?: Date;
  type?: string;
  tour?: ITour;
  isDriven?: boolean;
}

export interface IStageClassification {
  id?: string;
  position: number;
  tour: ITour;
  etappe: IEtappe;
  tourrider: ITourrider;
}

export interface ITourClassification {
  id?: string;
  position: number;
  tour: ITour;
  tourrider: ITourrider;
}

