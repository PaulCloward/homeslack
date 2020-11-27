import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploaderTaskComponent } from './uploader-task.component';

describe('UploaderTaskComponent', () => {
  let component: UploaderTaskComponent;
  let fixture: ComponentFixture<UploaderTaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaderTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
