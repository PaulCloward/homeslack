import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarShellComponent } from './navbar-shell.component';

describe('NavbarShellComponent', () => {
  let component: NavbarShellComponent;
  let fixture: ComponentFixture<NavbarShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
