import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInPropertyInfoPageComponent } from './fill-in-property-info-page.component';

describe('FillInPropertyInfoPageComponent', () => {
  let component: FillInPropertyInfoPageComponent;
  let fixture: ComponentFixture<FillInPropertyInfoPageComponent>;

  beforeEach(async(() => {
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
