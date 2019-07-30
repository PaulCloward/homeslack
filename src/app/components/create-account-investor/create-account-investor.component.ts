import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account-investor',
  templateUrl: './create-account-investor.component.html',
  styleUrls: ['./create-account-investor.component.css']
})
export class CreateAccountInvestorComponent implements OnInit {


  selectedCompanyTypeNum:number = -1;
  selectedCompanyType:string = "Company Type";

  SOLE_PROPRIETORSHIP:number = 1;
  GENERAL_PARTNERSHIP:number = 2;
  LIMITED_PARNERSHIP:number = 3;
  LIMITED_LIABILITY_PARTNERSHIP:number = 4;
  LIMITED_LIABILITY_LIMITED_PARTNERSHIP:number = 5;
  CORPORATION:number = 6;
  NON_PROFIT_CORPORATION:number = 7;
  LIMITED_LIABILITY_CORPORATION:number = 8;
  MASSACHUSETTS_TRUSTS:number = 9;
  TRUST:number = 10;
  JOINT_VENTURE:number = 11;
  TENANTS_IN_COMMON:number = 12;
  MUNICIPALITY:number = 13;
  ASSOCIATION:number = 14;

  firstName:string;
  lastName:string;
  phone:string;
  email:string;
  streetAddress:string;
  suiteNumber:string;
  city:string;
  zip:string;
  ein:string;
  password:string;
  confirmPassword:string;

  constructor() { }

  ngOnInit() {
  }

  onClickCompanyType(companyType:number, companyTypeName:string){
    this.selectedCompanyTypeNum = companyType;
    this.selectedCompanyType = companyTypeName;
  }

}
