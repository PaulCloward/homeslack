import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.scss']
})
export class FlashMessageComponent implements OnInit {

    @Input() message: string;
    showMessage: boolean;

    constructor() {
        this.showMessage = false;
    }

    ngOnInit() {
	  }

    ngOnChanges(changes: SimpleChanges) {
        this.manageMessage(changes.message.currentValue);
        console.log(changes.message.currentValue);// current selected value
        console.log(changes.message.previousValue);// previous selected value
    }

    manageMessage(message: string) {
        if (message && message.length > 0) {
            this.message = message;
            this.showMessage = true;

            setTimeout(() => {
                this.showMessage = false;
                this.message = '';
            }, 3000);
        }
    }

}
