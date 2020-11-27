import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PropertyProfileComponent } from './property-profile.component';

describe('PropertyProfileComponent', () => {
  let component: PropertyProfileComponent;
  let fixture: ComponentFixture<PropertyProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
