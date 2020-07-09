import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorLoginComponent } from './investor-login.component';

describe('InvestorLoginComponent', () => {
  let component: InvestorLoginComponent;
  let fixture: ComponentFixture<InvestorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
