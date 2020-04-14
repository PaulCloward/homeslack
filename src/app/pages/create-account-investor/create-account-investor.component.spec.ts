import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountInvestorComponent } from './create-account-investor.component';

describe('CreateAccountInvestorComponent', () => {
  let component: CreateAccountInvestorComponent;
  let fixture: ComponentFixture<CreateAccountInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
