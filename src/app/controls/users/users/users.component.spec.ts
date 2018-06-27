import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserService } from 'app/services/user.service';
import { MockUserService } from './../dashboard/dashboard.component.spec';
import { MessageService } from 'app/services/message.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
      ],
      declarations: [ UsersComponent ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        MessageService,
      ],
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
