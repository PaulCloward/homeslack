import { IAddress } from '../model/IAddress';

export class PropertyDetails{
    
    living_square_feet: number;
    lot_size:number;
    lot_size_unit:string;
    year:number;
    beds:number;
    baths: number;
    garage:number;
    basement:boolean;
    basement_completed?:number;
    pool:boolean;
    pool_description?:string;
    cooling_type:string;
    hot_tub:boolean;
    hot_tub_description?:string;
    roof_age_range:string;
    concerns_hvac_roofing_etc:string;
    concerns_other:string; 
    address:IAddress;

    constructor(){
        this.basement = false;
        this.pool = false;
        this.hot_tub = false;
        this.lot_size_unit = "sqft";
        this.address = {street:null,
            state: null, city:null, zip_code: null};
    }
}