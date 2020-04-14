import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PropertyFinderService {

  constructor(private mHttp:Http) { }

  getHomeProperties(address1:string, address2:string){
   // const _url: string = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address1=" + address1 + "&address2=" + address2;
   //const _url: string = "https://apis.estated.com/v4/property?token=GW15yIfma4tFK50yWL2W7wUqXtiiW8&unit_type=APT&unit_number=3&street_number=1319&street_pre_direction=N&street_name=Campbell&street_suffix=Ave&city=Chicago&state=IL&zip_code=60622";
    const _url:string = "";
   let headers = new Headers();
    headers.append("Accept", "application/json");
    //headers.append("apikey", " 4bc33784e9303aa56b5bef7c05483574");
    headers.append("apikey", " GINxSJtlrppUC8SS9EO1SnhRq4L5uQ0mQ");
    return this.mHttp.get(_url,{headers:headers}).map((res: Response) => res.json());
  }
}
