import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillPropertyDetailsComponent } from './fill-property-details.component';

describe('FillPropertyDetailsComponent', () => {
  let component: FillPropertyDetailsComponent;
  let fixture: ComponentFixture<FillPropertyDetailsComponent>;

  beforeEach(async(() => {
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
