import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordErrorStateMatcher, PasswordValidator } from 'app/services/validators/password-validation.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ],
})
export class UserDetailComponent implements OnInit {
  pwdFormControl = new FormControl('', [
    Validators.email,
    //  PasswordValidator.MatchPassword,
  ]);

  matcher = new PasswordErrorStateMatcher();
  // form: any;

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
    private fb: FormBuilder,
  ) {

    // this.form = fb.group({
    //   password: [''],
    //   confirmPassword: [''],
    // }, {
    //   validator: PasswordValidator.MatchPassword,
    // })

  }

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

  isPasswordRepeated(): boolean {
    return this.passwordRepeat === this.user.password;
  }

}
