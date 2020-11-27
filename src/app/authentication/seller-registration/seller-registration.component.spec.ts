import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerRegistrationComponent } from './seller-registration.component';

describe('SellerRegistrationComponent', () => {
  let component: SellerRegistrationComponent;
  let fixture: ComponentFixture<SellerRegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
