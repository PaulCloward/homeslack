import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordHomeComponent } from './record-home.component';

describe('RecordHomeComponent', () => {
  let component: RecordHomeComponent;
  let fixture: ComponentFixture<RecordHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
