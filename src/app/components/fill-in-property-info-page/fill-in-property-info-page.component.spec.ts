import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FillInPropertyInfoPageComponent } from './fill-in-property-info-page.component';

describe('FillInPropertyInfoPageComponent', () => {
  let component: FillInPropertyInfoPageComponent;
  let fixture: ComponentFixture<FillInPropertyInfoPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInPropertyInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillInPropertyInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
