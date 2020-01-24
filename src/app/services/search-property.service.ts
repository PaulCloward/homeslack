import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { PropertyDetails } from '../class/PropertyDetails';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SearchPropertyService {

  constructor(private mHTTP: Http, private mAngularFirestore: AngularFirestore) { }

  searchForHomeProperty(address1:string, address2:string){
    
    var _url: string = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail?address1=" + address1 + "&address2=" + address2 + "";

    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("apikey", "  f2e58caae3c631c04c806aa292c23c5c");
    return this.mHTTP.get(_url,{headers:headers})
      .map((res: Response) => res.json());
  }
}
