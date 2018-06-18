import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DashboardComponent } from './dashboard.component';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  template: '',
})
class MockLoginComponent { }

@Component({
  selector: 'app-user-search',
  template: '',
})
class MockMessageComponent { }

export class MockUserService extends UserService {
  getUsers (): Observable<User[]> {
    return of([]);
  }
}

@NgModule({
  declarations: [MockLoginComponent, MockMessageComponent],
  exports:      [MockLoginComponent, MockMessageComponent],
  providers: [
    {provide: UserService, useClass: MockUserService },
  ],
})
class MockModule { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        // AppMaterialModule,
        MockModule,
        RouterTestingModule.withRoutes([
            {
                path: 'login',
                component: MockLoginComponent,
            },
        ]),
      ],
      providers: [
        MockUserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
