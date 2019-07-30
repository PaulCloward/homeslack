import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOccupancyStatusComponent } from './list-occupancy-status.component';

describe('ListOccupancyStatusComponent', () => {
  let component: ListOccupancyStatusComponent;
  let fixture: ComponentFixture<ListOccupancyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOccupancyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOccupancyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
