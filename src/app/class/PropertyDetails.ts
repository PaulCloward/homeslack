import { Address } from './Address';

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
    address:Address;
    
    constructor(){
        this.address = Object.assign({},new Address());
        this.living_square_feet = 0;
        this.lot_size = 0;
        this.lot_size_unit = 'sqft';
        this.year = 0;
        this.beds = 1;
        this.baths = 1;
        this.garage = 0;
        this.basement = false;
        this.basement_completed = 0;
        this.pool = false;
        this.pool_description;
        this.cooling_type = "None";
        this.hot_tub = false;
        this.hot_tub_description = "";
        this.roof_age_range = '1 - 3 years';
        this.concerns_hvac_roofing_etc = "";
        this.concerns_other = "";
    }
}