import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesRootComponent } from './heroes-root.component';

describe('HeroRootComponent', () => {
  let component: HeroesRootComponent;
  let fixture: ComponentFixture<HeroesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesRootComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
