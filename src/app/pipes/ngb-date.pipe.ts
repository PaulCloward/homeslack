import { Pipe, PipeTransform } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Pipe({name: 'ngbDate'})
export class NgbDatePipe implements PipeTransform {
    transform(value: NgbDate): Date {
        if(value != null){
            return new Date(value.year, value.month - 1, value.day);
        }else{
            return null;
        }
    }
}
