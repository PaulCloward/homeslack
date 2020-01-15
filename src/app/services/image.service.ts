import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PropertyImage } from '../class/PropertyImage';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  readonly KEY_PROPERITES:string = 'properties'; 
  readonly KEY_PROPERTY_IMAGES:string = 'image_of_properties'; 

  userUID:string;

  constructor(private mFirestore: AngularFirestore, private mStorage:AngularFireStorage, private mAuth:AngularFireAuth) { 
    mAuth.authState.subscribe(user => {
      this.userUID = user.uid;
    })
  }

  getImageDetailList() {
    return this.mFirestore.collection(this.KEY_PROPERITES).valueChanges();
  }

  insertImageDetails(imageDetails) {
    this.mFirestore.collection(this.KEY_PROPERITES).add(imageDetails);
  }

  uploadImageToStorage(file:File) {

    console.log("file: " + file.name);
    if(this.userUID == null){
      return;
    }
 
    var filePath = `sellers/${this.userUID}/${Date.now()}_${file.name}`;
    const fileRef = this.mStorage.ref(filePath);
    this.mStorage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          let newPropertyImage:PropertyImage = {user:this.userUID, image_url: url};
          this.insertImageDetails(newPropertyImage);
        })
      })
    ).subscribe();
  
}
}
