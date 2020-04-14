import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSupportComponent } from './navbar-support.component';

describe('NavbarSupportComponent', () => {
  let component: NavbarSupportComponent;
  let fixture: ComponentFixture<NavbarSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
