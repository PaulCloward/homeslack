import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoyNewComponent } from './directoy-new.component';

describe('DirectoyNewComponent', () => {
  let component: DirectoyNewComponent;
  let fixture: ComponentFixture<DirectoyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
