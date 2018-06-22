import { Injectable } from '@angular/core';
import { NgForm, FormGroupDirective, FormControl, FormGroup } from '@angular/forms';
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
