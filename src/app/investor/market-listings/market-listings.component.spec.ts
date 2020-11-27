import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MarketListingsComponent } from './market-listings.component';

describe('MarketListingsComponent', () => {
  let component: MarketListingsComponent;
  let fixture: ComponentFixture<MarketListingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
