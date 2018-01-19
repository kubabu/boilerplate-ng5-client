import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl, NgForm } from '@angular/forms';
import { ControlContainer } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from './../../services/hero.service';
import { MockHeroService } from './../dashboard/dashboard.component.spec';
import { AppMaterialModule } from './../../app.material.module';


class MockControlContainer {}

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [
        AppMaterialModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
       ],
      providers: [
        { provide: FormControl, useClass: MockControlContainer },
        { provide: HeroService, useClass: MockHeroService },
        { provide: ControlContainer, useExisting: NgForm }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
