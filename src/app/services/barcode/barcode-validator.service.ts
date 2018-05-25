import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BarcodeValidatorService {
  // This service checks if decoded barcode is allowed in given context
  public validatedCodes$: Observable<any>;

  private _codes$: Subject<any>;

  constructor() {
    this._codes$ = new Subject<any>();
    this.validatedCodes$ = this._codes$.asObservable();
  }

  validateCodes(codes: Observable<any>, enqueue = false): Observable<any> {
    return codes
      .pipe(
        distinctUntilChanged(),
        switchMap(code => {
          const valCode = this.rawValidateCode(code);
          if (enqueue) {
            this._codes$.next(code);
          }
          return valCode;
        }),
      );
  }

  rawValidateCode(code): Observable<any> {
    // TODO add logic of code validation
    const validatedCode: any = code;

    return of(validatedCode);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
