import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { BarcodeValidatorService } from '../../services/barcode/barcode-validator.service';
import { Subject } from 'rxjs/Subject';
import { MatButton } from '@angular/material';
import { FormControl } from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-instant-search',
  templateUrl: './instant-search.component.html',
  styleUrls: ['./instant-search.component.css'],
})
export class InstantSearchComponent implements OnInit, AfterContentInit {

  isSubmitReady: boolean;
  code$ = new Subject<any>();

  @Input() barcodeFormat = 'any';
  // @Output() detectedBarcode = new EventEmitter<string>();
  barcodeInputControl: FormControl;

  @ViewChild('barcodeInput') barcodeInput: ElementRef;
  @ViewChild('submitButton') submitButton: ElementRef;


  constructor(private barcodeValidator: BarcodeValidatorService) {
    this.isSubmitReady = false;
  }


  ngOnInit() {
    this.barcodeInputControl = new FormControl();
    this.barcodeInputControl.valueChanges
      .subscribe(() => this.onChange());

      this.barcodeValidator
      .validateCodes(this.code$.asObservable()) // pass here barcode format
      .subscribe(res => this.onValidatedCode(res));

    this.barcodeValidator
      .validatedCodes
      .subscribe(res => this.onValidatedCode(res)); // display value decoded by Quagga from camera
  }

  onValidatedCode(code: string) {
    this.barcodeInput.nativeElement.value = code;
    this.setSubmitVisibility();
  }

  setSubmitVisibility() {
    if (this.barcodeInput.nativeElement.value === '') {
      this.isSubmitReady = false;
    } else {
      this.isSubmitReady = true;
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
