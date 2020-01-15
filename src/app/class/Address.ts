export class Address {
    city:string;
    street:string;
    state:string;
    zipCode:string;
    unit?:number;

    constructor(){
        this.city = "";
        this.street = "";
        this.state = "";
        this.zipCode = ""; 
    }
}