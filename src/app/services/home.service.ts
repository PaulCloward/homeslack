import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable   } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { IHome } from '../model/IHome';
import { IAddress } from '../model/IAddress';
import { IHomeDetails } from '../model/IHomeDetails';
import { IConcerns } from '../model/IConcerns';
import { ITimeframe } from '../model/ITimeframe';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class HomeService {

  homeCollection:AngularFirestoreCollection<IHome>;
  homes: Observable<IHome[]>;
  homeDoc: AngularFirestoreDocument<IHome>;
  
  homeDetails:IHomeDetails = {livingSquareFootage: -1, lotSizeAcres:-1, lotSizeSqFt:-1, lotSizeSelectedType:0, yearBuild:-1, numBeds:-1, numBaths: -1, carGarage:-1, basement:false,
          pool:false, cooling:-1, hotTub:false, roofAge:-1}
    
  addressInfo:IAddress = { city: "", street: "", state:"", zipCode:"", country: "", latitude:"", longitude: "", geoid: ""};
   
  concerns:IConcerns = { hperIssues: "", todoQuestion: "", otherConcerns: ""};
  
  timeframeInfo:ITimeframe = { homeDescription:"", listWithRealtor:false,
    understandRealtorFeeObligation:false,
    preferredClosingDate:"",
    beOutByClosing:false,
    preferredMoveOutDate:"",  
    canNotBeOutByClosingExplanation:false,
    selectRightOfferDate:"",
    propertyManagerInPlace:false,
    agreementWithManagerExpire:"", 
    propertyManagementAgreementKey:"", 
    rentalAgreementExpiration:"", 
    rentalAgreementKey:"", 
    tenantMonthlyPayment:-1, 
    securityDepositExist:false, 
    securityDepositAmount:-1 }

  homeSource = new BehaviorSubject<IHome>({
      id:"",
      addressInfo:this.addressInfo,
      homeDetails:this.homeDetails,
      concerns:this.concerns,
      timeframeInfo:this.timeframeInfo
  });
  currentHome = this.homeSource.asObservable();

  constructor(private _http: Http, private angularFireStore: AngularFirestore) {

  	//Collect all home listings from firestore
    this.homeCollection = this.angularFireStore.collection('homes');

    //Initialize homes:Observable<IHome[]>. User snapshotChanges() so we can get home listing id.
    this.homes = this.homeCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IHome;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getHomeListings(){
  	return this.homes;
  }

  addHomeListing(home: IHome){
  	this.homeCollection.add(home);
  }

  deleteHomeListing(home: IHome){
  	this.homeDoc = this.angularFireStore.doc(`homes/${home.id}`);
  	this.homeDoc.delete();
  }

  //Transferred from Property Service
  updateHomeProperties(newHomeData: IHome) {
    this.setLocalStorageProperty(newHomeData);
    this.homeSource.next(newHomeData);
  }

  getHomeProperties(address1:string, address2:string){
    
    var _url: string = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail?address1=" + address1 + "&address2=" + address2 + "&debug=True";

    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("apikey", "  0602d94d29350818db600ea4316178b1");
    return this._http.get(_url,{headers:headers})
      .map((res: Response) => res.json());
  }
  
  getLocalStorageProperty():IHome{
    let localStorageItem = JSON.parse(localStorage.getItem('homeListing'));
    return localStorageItem == null ? null : localStorageItem.homeListing;
  }
  
  setLocalStorageProperty(home:IHome):void{
    localStorage.setItem('homeListing', JSON.stringify({ homeListing: home }));    
  }

  clearLocalStoragePropertySearch(){
    localStorage.removeItem('homeListing');
  }
}
