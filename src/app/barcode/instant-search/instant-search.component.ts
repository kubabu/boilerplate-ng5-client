import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { BarcodeValidatorService } from '../../services/barcode/barcode-validator.service';
import { Subject } from 'rxjs/Subject';
import { MatButton } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-instant-search',
  templateUrl: './instant-search.component.html',
  styleUrls: ['./instant-search.component.css'],
})
export class InstantSearchComponent implements OnInit, AfterContentInit {

  message: string;

  private searchField: FormControl;

  @ViewChild('barcodeInput') barcodeInput: ElementRef;
  @ViewChild('submitButton') submitButton: ElementRef;

  code$ = new Subject<any>();

  constructor(private barcodeValidator: BarcodeValidatorService) {}

  ngOnInit() {
    this.barcodeValidator
      .doSearchbyCode(this.code$)
      .subscribe(
        res => {
          this.barcodeInput.nativeElement.value = res
        },
      );

    this.barcodeValidator
      .validatedCodes
      .subscribe(
        res => {
          this.barcodeInput.nativeElement.value = res;
        },
      ); // display value decoded by Quagga from camera

    // this.submitButton.nativeElement.
  }

  onChange() {
    this.code$.next(this.barcodeInput.nativeElement.value);
  }

  ngAfterContentInit() {
    this.barcodeInput.nativeElement.focus();
  }

  onSubmit() {
    // this.code$.next(this.barcodeInput.nativeElement.value);
    // this.barcodeElement.nativeElement.value = ''; // continue somehow
  }
}
