import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRootComponent } from './users-root.component';

describe('UserRootComponent', () => {
  let component: UsersRootComponent;
  let fixture: ComponentFixture<UsersRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRootComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
