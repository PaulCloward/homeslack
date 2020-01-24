import { Injectable } from '@angular/core';
import { Observable   } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { PropertyDetails } from '../class/PropertyDetails';
import { IAddress } from '../model/IAddress';
@Injectable({
  providedIn: 'root'
})
export class SellerPropertyService {

  mSellerPropertyDetailsSource:BehaviorSubject<PropertyDetails> = new BehaviorSubject(new PropertyDetails());
  
  constructor() { 
  }

  updateSellerPropertyDetailsSource(sellerProperty:PropertyDetails){
    this.mSellerPropertyDetailsSource.next(sellerProperty);
  }

  getSellerPropertyDetailsSource():Observable<PropertyDetails>{
    return this.mSellerPropertyDetailsSource.asObservable();
  }
}
