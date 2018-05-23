import { Component, OnInit, OnDestroy, ViewChild, AfterContentInit } from '@angular/core';
import { BarcodeDecoderService } from '../../services/barcode/barcode-decoder.service';
import { BarcodeValidatorService } from '../../services/barcode/barcode-validator.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-media-stream',
  templateUrl: './media-stream.component.html',
  styleUrls: ['./media-stream.component.scss'],
})
export class MediaStreamComponent implements OnInit, OnDestroy, AfterContentInit {

  lastResult: any;
  code$ = new Subject<any>();

  @ViewChild('interactive') interactive;

  constructor(private decoderService: BarcodeDecoderService, private barcodeValidator: BarcodeValidatorService) {};

  ngOnInit() {

    this.decoderService.onLiveStreamInit();
    this.decoderService.onDecodeProcessed();

    this.barcodeValidator
      .validateCodes(this.code$.asObservable(), true)
      .subscribe();

    this.decoderService
      .onDecodeDetected()
      .then(code => {
        this.lastResult = code;
        this.decoderService.onPlaySound();
        this.code$.next(code);
      });
  }

  ngAfterContentInit() {
    this.interactive.nativeElement.children[0].style.position = 'absolute';
  }

  ngOnDestroy() {
    this.decoderService.onDecodeStop();
  }

}
