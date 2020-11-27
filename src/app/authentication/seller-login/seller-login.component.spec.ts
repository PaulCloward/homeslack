import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerLoginComponent } from './seller-login.component';

describe('SellerLoginComponent', () => {
  let component: SellerLoginComponent;
  let fixture: ComponentFixture<SellerLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
