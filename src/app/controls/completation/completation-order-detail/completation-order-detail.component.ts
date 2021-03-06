import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { CompletationOrder } from 'app/models/completation/completation-order';

@Component({
  selector: 'app-completation-order-detail',
  templateUrl: './completation-order-detail.component.html',
  styleUrls: ['./completation-order-detail.component.scss'],
})
export class CompletationOrderDetailComponent implements OnInit, AfterViewInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public order: CompletationOrder;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 600,
    'canvasHeight': 400,
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getOrder() {
    const id = +this.route.snapshot.paramMap
      .get('id');
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
  }

}
