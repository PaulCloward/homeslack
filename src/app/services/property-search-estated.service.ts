import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertySearchEstatedService {

  constructor(private mHttp:Http) { }

  getPropertyInformation(address1:string, state:string, city:string, zipCode:string){

   const _url: string = "https://apis.estated.com/v4/property?token=GW15yIfma4tFK50yWL2W7wUqXtiiW8&street_address=" + address1 + "&city=" + city + 
    "&state=" + state + "&zip_code=" + zipCode;
     let headers = new Headers();
    headers.append("Accept", "application/json");
    return this.mHttp.get(_url,{headers:headers}).map((res: Response) => res.json());
  }
}
