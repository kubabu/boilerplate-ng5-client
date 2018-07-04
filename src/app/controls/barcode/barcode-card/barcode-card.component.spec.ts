import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeCardComponent } from './barcode-card.component';

describe('BarcodeCardComponent', () => {
  let component: BarcodeCardComponent;
  let fixture: ComponentFixture<BarcodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
