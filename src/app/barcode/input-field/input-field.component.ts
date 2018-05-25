import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { BarcodeValidatorService } from '../../services/barcode/barcode-validator.service';
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

  @Input() barcodeFormat: string;
  // @Output() detectedBarcode = new EventEmitter<string>();
  barcodeInputControl: FormControl;

  @ViewChild('barcodeInput') barcodeInput: ElementRef;


  constructor(private barcodeValidator: BarcodeValidatorService) {
  }


  ngOnInit() {
    this.barcodeInputControl = new FormControl();
    this.barcodeInputControl.valueChanges
      .subscribe(() => this.onChange());

      this.barcodeValidator
      .validateCodes(this.code$.asObservable()) // pass here barcode format
      .subscribe(res => this.onValidatedCode(res));

    this.barcodeValidator
      .validatedCodes$
      .subscribe(res => this.onValidatedCode(res)); // display value decoded by Quagga from camera
  }

  onValidatedCode(code: string) {
    this.barcodeInput.nativeElement.value = code;
    this.setSubmitVisibility();
    this.ngAfterContentInit();
  }

  setSubmitVisibility() {
    if (this.barcodeInput.nativeElement.value === '') {
      this.canSubmit = false;
    } else {
      this.canSubmit = true;
    }
  }

  onChange() {
    this.code$.next(this.barcodeInput.nativeElement.value);
  }

  ngAfterContentInit() {
    this.barcodeInput.nativeElement.focus();
  }

  onSubmit() {
    // this.code$.next(this.barcodeInput.nativeElement.value);
    // this.barcodeElement.nativeElement.value = ''; // TODO continue somehow
  }
}
