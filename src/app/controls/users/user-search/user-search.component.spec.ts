import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl, NgForm } from '@angular/forms';
import { ControlContainer } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserSearchComponent } from './user-search.component';
import { UserService } from './../../services/user.service';
import { MockUserService } from './../dashboard/dashboard.component.spec';
import { AppMaterialModule } from './../../app.material.module';


class MockControlContainer {}

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchComponent ],
      imports: [
        AppMaterialModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
       ],
      providers: [
        { provide: FormControl, useClass: MockControlContainer },
        { provide: UserService, useClass: MockUserService },
        { provide: ControlContainer, useExisting: NgForm },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
