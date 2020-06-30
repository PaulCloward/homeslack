export interface IInvestorInformation{
    timestamp:any;
    my_uid:string;
    company_name:string;
    contact_name:string;
    phone:string;
    email:string;
    company_address:string;
    suite?:string;
    city:string;
    zip_code:number;
    ein?:string;
    social?:string;
    company_type:string;
    updates_text:boolean;
    updates_email:boolean;
}