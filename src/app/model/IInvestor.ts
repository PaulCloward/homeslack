export interface IInvestor{
    created_account_timestamp:any;
    first_name:string;
    last_name:string;
    company_name:string;
    company_address:string;
	phone:string;
    email:string;
    suite?:string;
    city:string;
    zip_code:string;
    ein?:number;
    social_security?:number;
    company_type:string;
    receive_text_updates:boolean;
    receive_email_updates:boolean;
}