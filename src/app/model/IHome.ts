import { ITimeframe } from './ITimeframe';
import { IConcerns } from './IConcerns';
import { IAddress } from './IAddress';
import { IHomeDetails } from './IHomeDetails';

export interface IHome {
    id: string;
    addressInfo:IAddress;
    homeDetails:IHomeDetails;
    concerns:IConcerns;
    timeframeInfo: ITimeframe;
}