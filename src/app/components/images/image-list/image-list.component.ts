import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/image.service';
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: ['./image-list.css']
})
export class ImageListComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];

  constructor(private service: ImageService) { }

  ngOnInit() {
    this.service.getImageDetailList().subscribe(

      images=> {
        this.imageList = images;
        this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }


}
