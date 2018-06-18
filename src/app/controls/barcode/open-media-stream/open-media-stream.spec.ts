import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPlaceholderComponent } from './dummy-placeholder.component';

describe('DummyPlaceholderComponent', () => {
  let component: DummyPlaceholderComponent;
  let fixture: ComponentFixture<DummyPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
