import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPropertyComponent } from './verify-property.component';

describe('VerifyPropertyComponent', () => {
  let component: VerifyPropertyComponent;
  let fixture: ComponentFixture<VerifyPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
