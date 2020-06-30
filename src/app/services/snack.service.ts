import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError(message:string) {

    this.snackBar.open('You must be logged in as a ' + message, 'OK', {
      duration: 5000
    }).afterDismissed().pipe(
      tap(_ =>
      this.router.navigate(['/authentication'])
      )
    )
    .subscribe();

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(
        tap(_ =>
          this.router.navigate(['/authentication'])
        )
      )
      .subscribe();
  }
}