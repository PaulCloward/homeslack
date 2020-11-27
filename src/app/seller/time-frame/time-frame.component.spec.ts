import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeFrameComponent } from './time-frame.component';

describe('TimeFrameComponent', () => {
  let component: TimeFrameComponent;
  let fixture: ComponentFixture<TimeFrameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
