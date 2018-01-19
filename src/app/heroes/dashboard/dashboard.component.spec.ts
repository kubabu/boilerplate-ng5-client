import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppMaterialModule } from './../../app.material.module';
import { DashboardComponent } from './dashboard.component';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  template: ''
})
class MockLoginComponent { }

@Component({
  selector: 'app-hero-search',
  template: ''
})
class MockMessageComponent { }

export class MockHeroService extends HeroService {
  getHeroes (): Observable<Hero[]> {
    return of([]);
  }
}

@NgModule({
  declarations: [MockLoginComponent, MockMessageComponent],
  exports:      [MockLoginComponent, MockMessageComponent],
  providers: [
    {provide: HeroService, useClass: MockHeroService }
  ]
})
class MockModule { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        AppMaterialModule,
        MockModule,
        RouterTestingModule.withRoutes([
            {
                path: 'login',
                component: MockLoginComponent
            }
        ]),
      ],
      providers: [
        MockHeroService
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
