import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListingTimeComponent } from './listing-time.component';

describe('ListingTimeComponent', () => {
  let component: ListingTimeComponent;
  let fixture: ComponentFixture<ListingTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
