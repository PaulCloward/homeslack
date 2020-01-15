import { ITimeframe } from './ITimeframe';
import { IAddress } from './IAddress';
import { IHomeDetails } from './IHomeDetails';

export interface IHome {
    id: string;
    addressInfo:IAddress;
    homeDetails:IHomeDetails;
    timeframeInfo: ITimeframe;
}