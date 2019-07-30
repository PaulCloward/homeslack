import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddTutorial, RemoveTutorial } from '../../actions/tutorial.action'; 
import { TutorialState } from '../../state/tutorial.state';
import { Tutorial } from '../../model/tutorial.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  tutorials$: Observable<Tutorial>;

  constructor(private store: Store) {
  	this.tutorials$ = this.store.select(state => state.tutorials.tutorials)
  }

  deleteTutorials(name){
  	this.store.dispatch(new RemoveTutorial(name));
  }

  ngOnInit() {
  }

}
