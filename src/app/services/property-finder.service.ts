import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PropertyFinderService {

  constructor(private mHttp:Http) { }

  getHomeProperties(address1:string, address2:string){
    const _url: string = "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address1=9528+S+Foxwood+Lane&address2=Sandy+UT+84092";
    //const _url: string = "https://apis.estated.com/v4/property?token=lCfT0q4NxPQFvZoOQGt8LCVBhvNmc8&street_address=151 Battle Green Dr&city=Rochester&state=NY&zip_code=14624";
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("apikey", " c56318e1171d4682d97091917b823bea");

    return this.mHttp.get(_url,{headers:headers}).map((res: Response) => res.json());
  }
}
