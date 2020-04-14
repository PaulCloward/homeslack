import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SearchPropertyService {

  constructor(private mHTTP: Http) { }

  searchForHomeProperty(address1:string, address2:string){
    
    var _url: string = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail?address1=" + address1 + "&address2=" + address2 + "";

    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("apikey", " 4bc33784e9303aa56b5bef7c05483574");
    return this.mHTTP.get(_url,{headers:headers})
      .map((res: Response) => res.json());
  }
}
