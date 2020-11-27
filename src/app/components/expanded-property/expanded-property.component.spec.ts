import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpandedPropertyComponent } from './expanded-property.component';

describe('ExpandedPropertyComponent', () => {
  let component: ExpandedPropertyComponent;
  let fixture: ComponentFixture<ExpandedPropertyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
