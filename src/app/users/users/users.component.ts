import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ],
})

export class UsersComponent implements OnInit {
  selectedUser: User;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(h => this.setUsers(h));
  }

  setUsers(users: User[]): void {
    this.users = users;
  }

  add(name: String): void {
    name = name.trim();
    this.userService.addUser({ name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(user: User): void {
    this.userService.deleteUser(user).subscribe(
      _ => {
        this.users = this.users.filter(h => h !== user);
      },
    );
  }

}
