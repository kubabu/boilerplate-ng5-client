import { Injectable } from '@angular/core';
import { NgForm, FormGroupDirective, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable()
export class PasswordErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Injectable()
export class PasswordValidator {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag

    if (password !== confirmPassword) {
        AC.get('confirmPassword').setErrors( { MatchPassword: true } )
    } else {
        return null
    }
  }

  static passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('passwordConfirm').value;
    const confirmedPassword = confirmPassword ? confirmPassword : '';
    if (password === confirmedPassword) {
      return null;
    } else {
      return {'mismatch': true};
    }
  }

}
