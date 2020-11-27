import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvestorListedPropertyComponent } from './investor-listed-property.component';

describe('InvestorListedPropertyComponent', () => {
  let component: InvestorListedPropertyComponent;
  let fixture: ComponentFixture<InvestorListedPropertyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorListedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorListedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
