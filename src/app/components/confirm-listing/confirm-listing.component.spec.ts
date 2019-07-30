import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmListingComponent } from './confirm-listing.component';

describe('ConfirmListingComponent', () => {
  let component: ConfirmListingComponent;
  let fixture: ComponentFixture<ConfirmListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
