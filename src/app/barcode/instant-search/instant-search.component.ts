import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { BarcodeValidatorService } from '../../services/barcode/barcode-validator.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-instant-search',
  templateUrl: './instant-search.component.html',
  styleUrls: ['./instant-search.component.css'],
})
export class InstantSearchComponent implements OnInit, AfterContentInit {

  message: string;

  @ViewChild('barcodeInput') barcodeElement: ElementRef;

  code$ = new Subject<any>();

  constructor(private barcodeValidator: BarcodeValidatorService) {}

  ngOnInit() {
    this.barcodeValidator
        .doSearchbyCode(this.code$)
        .subscribe(
          res => {
            this.message = res
          },
          err => {
            this.message = `An Error! ${err.json().error}`
          },
        );
  }

  onChange() {
    this.code$.next(this.barcodeElement.nativeElement.value);
  }

  ngAfterContentInit() {
    this.barcodeElement.nativeElement.focus();
  }

  onSubmit() {
    this.barcodeElement.nativeElement.value = ''; // continue somehow
  }
}
