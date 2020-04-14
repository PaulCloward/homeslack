import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PropertySearchCoreLogicService {

  constructor(private mHTTP: Http) { }

  searchForHomeProperty(address1:string, address2:string){
    

    var _url: string = "https://api-prod.corelogic.com/property?address=9528%20Foxwood%20Lane&city=Sandy&state=Utah&zip5=84092&responseLimit=1&pageNumber=1&pageSize=1 HTTP/1.1";

    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("apikey", " GINxSJtlrppUC8SS9EO1SnhRq4L5uQ0mQ");
    return this.mHTTP.get(_url,{headers:headers})
      .map((res: Response) => res.json());
  }
}