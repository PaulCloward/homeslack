import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPropertiesComponent } from './monitor-properties.component';

describe('MonitorPropertiesComponent', () => {
  let component: MonitorPropertiesComponent;
  let fixture: ComponentFixture<MonitorPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
