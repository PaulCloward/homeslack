export interface ITimeframe{
	homeDescription:string;
	listWithRealtor:boolean;
	understandRealtorFeeObligation?:boolean;
	preferredClosingDate?:string;
	beOutByClosing?:boolean;
	preferredMoveOutDate?:string;	
	canNotBeOutByClosingExplanation?:boolean;
	selectRightOfferDate?:string;
	propertyManagerInPlace?:boolean;
	agreementWithManagerExpire?:string;
	propertyManagementAgreementKey?:string;
	rentalAgreementExpiration?:string;
	rentalAgreementKey?:string;
	tenantMonthlyPayment?:number;
	securityDepositExist?:boolean;
	securityDepositAmount?:number;
}

