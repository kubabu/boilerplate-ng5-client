import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';
import { FormControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { PasswordErrorStateMatcher, PasswordValidator } from 'app/services/validators/password-validation.service';
import { RolesConfiguration } from 'app/config/roles-config';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ],
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  password = new FormControl('', Validators.minLength(4));
  passwordConfirm = new FormControl('', Validators.minLength(4));
  form: FormGroup;
  matcher = new PasswordErrorStateMatcher();
  passwordHide = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    public rolesConfig: RolesConfiguration,
  ) {
    this.form  = new FormGroup({
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    }, PasswordValidator.passwordMatchValidator);
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
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // check if passwords are different
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  isPasswordRepeated(): boolean {
    const result = this.passwordConfirm.value === this.user.password;
    return result;
  }

}
