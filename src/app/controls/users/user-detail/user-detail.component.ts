import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ],
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  selectedRole: string;
  passwordRepeat: string;
  passwordMatch: boolean;
  passwordHide = true;

  allowedRoles = [
    {value: '', viewValue: 'Żadna'},
    {value: 'Bot', viewValue: 'Bot'},
    {value: 'User', viewValue: 'Użytkownik'},
    {value: 'Admin', viewValue: 'Administrator'},
    {value: 'Dev', viewValue: 'Programista'},
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): any {
    const id = +this.route.snapshot.paramMap
      .get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        user.password = '';
        this.user = user;
        this.passwordRepeat = this.user.password;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // allowedRoles.se
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  getPasswordErrorMessage() {
    return this.passwordRepeat !== this.user.password ? 'Podane hasła różnią się!' : ''
  }
}
