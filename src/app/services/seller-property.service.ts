import { Injectable } from '@angular/core';
import { Observable   } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { PropertyDetails } from '../class/PropertyDetails';
import { Address } from '../class/Address';
@Injectable({
  providedIn: 'root'
})
export class SellerPropertyService {

  mSellerPropertyDetailsSource:BehaviorSubject<PropertyDetails> = new BehaviorSubject(new PropertyDetails());
  mSellerPropertyAddressSource:BehaviorSubject<Address> = new BehaviorSubject(new Address);
  
  constructor() { 
  }

  updateSellerPropertyDetailsSource(sellerProperty:PropertyDetails){
    this.mSellerPropertyDetailsSource.next(sellerProperty);
  }

  getSellerPropertyDetailsSource():Observable<PropertyDetails>{
    return this.mSellerPropertyDetailsSource.asObservable();
  }

  updateSellerPropertyAddressSource(sellerPropertyAddress:Address){
    this.mSellerPropertyAddressSource.next(sellerPropertyAddress);
  }

  getSellerPropertyAddressSource():Observable<Address>{
    return this.mSellerPropertyAddressSource.asObservable();
  }
}
