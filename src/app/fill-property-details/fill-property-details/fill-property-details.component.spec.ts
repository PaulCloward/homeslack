import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FillPropertyDetailsComponent } from './fill-property-details.component';

describe('FillPropertyDetailsComponent', () => {
  let component: FillPropertyDetailsComponent;
  let fixture: ComponentFixture<FillPropertyDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FillPropertyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
