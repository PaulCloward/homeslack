import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmListingComponent } from './confirm-listing.component';

describe('ConfirmListingComponent', () => {
  let component: ConfirmListingComponent;
  let fixture: ComponentFixture<ConfirmListingComponent>;

  beforeEach(waitForAsync(() => {
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
