import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersToCompleteComponent } from './orders-to-complete.component';

describe('OrdersToCompleteComponent', () => {
  let component: OrdersToCompleteComponent;
  let fixture: ComponentFixture<OrdersToCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersToCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersToCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
