import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyViewService {

  mViewPropertyData:BehaviorSubject<any> = new BehaviorSubject(null);
  mWatchListAddresses:BehaviorSubject<String[]> = new BehaviorSubject([]);
  
  constructor() { 
  }

  updateViewPropertyData(data){
    this.mViewPropertyData.next(data);
  }

  getViewPropertyData(){
    return this.mViewPropertyData.asObservable();
  }

  updateWatchListAddresses(data){
    this.mWatchListAddresses.next(data);
  }

  getWatchListAddresses(){
    return this.mWatchListAddresses.asObservable();
  }
}
