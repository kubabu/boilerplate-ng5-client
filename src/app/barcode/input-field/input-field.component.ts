import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { BarcodeValidatorService } from '../../barcode/services/barcode-validator.service';
import { Subject } from 'rxjs/Subject';
import { MatButton } from '@angular/material';
import { FormControl } from '@angular/forms';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit, AfterContentInit {

  canSubmit = false;
  code$ = new Subject<any>();
  barcode: string;

  @Input() barcodeFormat: string;
  @Output() detectedBarcode = new EventEmitter();

  // two references to the same form input
  barcodeInputControl: FormControl;       // to subscribe on value changes
  @ViewChild('barcodeInput') barcodeInput: ElementRef;  // to focus on it afterInit


  constructor(private barcodeValidator: BarcodeValidatorService) { }


  ngOnInit() {
    this.barcodeInputControl = new FormControl();
    this.barcodeInputControl.valueChanges
      .subscribe(res => this.onChange());

      this.barcodeValidator
      .validateCodes(this.code$.asObservable()) // pass here barcode format
      .subscribe(
        res => this.onValidatedCode(res),
        err => this.onError(err),
    );

    this.barcodeValidator
      .validatedCodes$
      .subscribe(
        res => this.onValidatedCode(res),
        err => this.onError(err),
    ); // display value decoded by Quagga from camera
  }

  ngAfterContentInit() {
    this.barcodeInput.nativeElement.focus();   // so external barcode reader can write as HID device, and to force submit visibility change
  }

  onValidatedCode(code: string) {
    this.barcodeInput.nativeElement.value = code;
    this.setSubmitVisibility();
    this.ngAfterContentInit();
  }

  setSubmitVisibility() {
    if (this.barcodeInputControl.value === '') {
    // if (this.barcodeInput.nativeElement.value === '') {
      this.canSubmit = false;
    } else {
      this.canSubmit = true;
    }
  }

  onChange() {
    this.code$.next(this.barcodeInputControl.value);
  }

  onError(err: any) {

  }

  onSubmit() {
    // send found barcode
    // this.code$.next(this.barcodeInput.nativeElement.value);
    this.detectedBarcode.emit(this.barcodeInputControl.value)
    this.barcodeInput.nativeElement.value = '';

    // TODO navigate back
  }
}
