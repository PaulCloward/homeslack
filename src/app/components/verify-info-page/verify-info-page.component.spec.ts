import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerifyInfoPageComponent } from './verify-info-page.component';

describe('VerifyInfoPageComponent', () => {
  let component: VerifyInfoPageComponent;
  let fixture: ComponentFixture<VerifyInfoPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
