import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from './../../app.material.module';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './../../services/hero.service';
import { MockHeroService } from './../dashboard/dashboard.component.spec';
import { MessageService } from './../../services/message.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterModule
      ],
      declarations: [ HeroesComponent ],
      providers: [
        { provide: HeroService, useClass: MockHeroService },
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
