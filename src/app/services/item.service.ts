import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Item } from '../model/IItem';
import { Observable} from 'rxjs';

@Injectable()
export class ItemService {

  itemCollection:AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private angularFireStore: AngularFirestore) { 
  	
  	this.itemCollection = this.angularFireStore.collection('items', ref => ref.orderBy('title', 'asc'));

  	this.items = this.itemCollection.snapshotChanges().map(changes => {
  		return changes.map(a => {
  			const data = a.payload.doc.data() as Item;
  			data.id = a.payload.doc.id;
  			return data;
  		});
  	});
  }

  getItems(){
  	return this.items;
  }

  addItem(item: Item){
  	this.itemCollection.add(item);
  }

  deleteItem(item: Item){
  	this.itemDoc = this.angularFireStore.doc(`items/${item.id}`);
  	this.itemDoc.delete();
  }
}

