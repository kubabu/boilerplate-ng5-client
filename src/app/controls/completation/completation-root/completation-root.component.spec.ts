import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletationRootComponent } from './completation-root.component';

describe('CompletationRootComponent', () => {
  let component: CompletationRootComponent;
  let fixture: ComponentFixture<CompletationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
