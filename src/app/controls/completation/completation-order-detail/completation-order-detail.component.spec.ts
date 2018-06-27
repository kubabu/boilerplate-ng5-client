import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletationOrderDetailComponent } from './completation-order-detail.component';

describe('CompletationOrderDetailComponent', () => {
  let component: CompletationOrderDetailComponent;
  let fixture: ComponentFixture<CompletationOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletationOrderDetailComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletationOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
