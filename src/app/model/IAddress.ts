export interface IAddress {
	city:string;
    street:string;
    state:string;
    zipCode:number;
    unit?:number;
    country?:string;
    latitude?:string;
    longitude?:string;
    geoid?:string;
}