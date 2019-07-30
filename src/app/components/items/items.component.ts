import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../model/IItem';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  item:Item = {
  	title: '',
  	description:''
  };

  items:Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  	this.itemService.getItems().subscribe(items => {
  		//console.log(items);
  		this.items = items;
  	});
  }

  onSubmit(){
  	
  	if(this.item.title != '' && this.item.description != ''){
  		console.log("onSubmit() - " + this.item.title + " " + this.item.description);
  		this.itemService.addItem(this.item);
  		this.item.title = '';
  		this.item.description = '';
  	}		
  }

  deleteItem(event, item){
  	this.itemService.deleteItem(item);
  }
}
