import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListingItemComponent } from './listing-item.component';

describe('ListingItemComponent', () => {
  let component: ListingItemComponent;
  let fixture: ComponentFixture<ListingItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
