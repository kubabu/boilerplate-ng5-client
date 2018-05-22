import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { BarcodeValidatorService } from '../../services/barcode/barcode-validator.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-instant-search',
  templateUrl: './instant-search.component.html',
  styleUrls: ['./instant-search.component.css'],
})
export class InstantSearchComponent implements OnInit, AfterContentInit {

  spinner: boolean;
  message: string;

  @ViewChild('barcodeInput') firstNameElement: ElementRef;

  code$ = new Subject<any>();

  constructor(private barcodeValidator: BarcodeValidatorService) {}

  ngOnInit() {
    this.barcodeValidator
        .doSearchbyCode(this.code$)
        .subscribe(
          res => {
            this.spinner = false;
            this.message = res
          },
          err => {
            this.spinner = false;
            this.message = `An Error! ${err.json().error}`
          },
        );
  }

  onChange() {
    // this.spinner = true;
    // detect enter
  }

  ngAfterContentInit() {
    this.firstNameElement.nativeElement.focus();
  }

  submit() {
    this.spinner = false;
  }
}
