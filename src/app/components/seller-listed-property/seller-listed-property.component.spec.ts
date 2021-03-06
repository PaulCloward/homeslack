import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerListedPropertyComponent } from './seller-listed-property.component';

describe('SellerListedPropertyComponent', () => {
  let component: SellerListedPropertyComponent;
  let fixture: ComponentFixture<SellerListedPropertyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerListedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerListedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
