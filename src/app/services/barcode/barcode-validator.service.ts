import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BarcodeValidatorService {
  // This service checks if decoded barcode is allowed in given context
  public validatedCodes: Observable<any>;

  private codes: Subject<any>;

  constructor() {
    this.codes = new Subject<any>();
    this.validatedCodes = this.codes.asObservable();
  }

  doSearchbyCode(codes: Observable<any>) {
    return codes
      .pipe(
        switchMap(code => this.rawSearchByCode(code)),
      )
  }

  rawSearchByCode(code): Observable<any> {
    // TODO add logic of code validation
    const validatedCode: any = code;

    this.codes.next(validatedCode);

    return of(validatedCode);

  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}

