import { Component, OnInit } from '@angular/core';

import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        if (users.length > 5) {
          this.users = users.slice(1, 5);
        } else {
          this.users = users
        }
      });
  }
}
