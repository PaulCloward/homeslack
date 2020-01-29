import { Component } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;

  constructor() {
      this.form = new FormGroup({
          field: new FormControl('', CustomValidators.max(20))
      });
  }
}




