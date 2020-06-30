import { Injectable } from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {PopupComponent} from '../popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }
  // tslint:disable-next-line:max-line-length
  public showDialog(property:any): Observable<boolean> {
    let dialogRef: MatDialogRef<PopupComponent>;

    dialogRef = this.dialog.open(PopupComponent, property);

   

    return dialogRef.afterClosed();
  }
}
