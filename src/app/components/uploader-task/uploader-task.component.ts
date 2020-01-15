import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'uploader-task',
  templateUrl: './uploader-task.component.html',
  styleUrls: ['./uploader-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private mStorage: AngularFireStorage, private mFirestore: AngularFirestore, private mImageService:ImageService) { }

  ngOnInit() {
    //this.startUpload();
    this.mImageService.uploadImageToStorage(this.file);
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.mStorage.ref(path);
    // The main task
    this.task = this.mStorage.upload(path, this.file);
    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.mFirestore.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }



  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}