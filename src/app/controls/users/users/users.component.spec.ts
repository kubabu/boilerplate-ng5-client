import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from './../../app.material.module';
import { UsersComponent } from './users.component';
import { UserService } from './../../services/user.service';
import { MockUserService } from './../dashboard/dashboard.component.spec';
import { MessageService } from './../../services/message.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterModule,
      ],
      declarations: [ UsersComponent ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        MessageService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
