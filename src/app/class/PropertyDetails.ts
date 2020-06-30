import { IAddress } from '../model/IAddress';

export class PropertyDetails{
    
    living_square_feet?: number;
    lot_size?:number;
    lot_size_unit?:string;
    year?:number;
    beds?:number;
    baths?: number;
    garage?:number;
    basement?:boolean;
    basement_completed?:number;
    pool?:boolean;
    pool_description?:string;
    cooling?:string;
    hot_tub?:boolean;
    hot_tub_description?:string;
    roof_age_range?:string;
    concerns_hvac_roofing_etc?:string;
    concerns_other?:string; 
    latitude?:number;
    longitude?:number;
    address:IAddress;

    constructor(){
        this.basement = null;
        this.pool = null;
        this.hot_tub = null;
        this.lot_size_unit = null;
        this.address = {street:null,
            state: null, city:null, zip_code: null};
    }
}