export interface IHomeDetails{
	livingSquareFootage: number;
    lotSizeAcres:number;
    lotSizeSqFt:number;
    lotSizeSelectedType:number;
    yearBuild:number;
    numBeds:number;
    numBaths: number;
    carGarage:number;
    basement:boolean;
    basementPercentageFinished?:string;
    pool:boolean;
    poolDescription?:string;
    cooling:number;
    hotTub:boolean;
    hotTubDescription?:string;
    roofAge:number;
}