import { NgModule } from '@angular/core';
import { BarcodeDecoderService } from '../services/barcode/barcode-decoder.service';
import { BarcodeValidatorService } from '../services/barcode/barcode-validator.service';
import { HeroService, HeroHttpService } from '../services/hero.service';
import { SharedModule } from './shared.module';
import { MessageService } from 'app/services/message.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    BarcodeValidatorService,
    BarcodeDecoderService,
    { provide: HeroService, useClass: HeroHttpService },
    MessageService,
  ],
  exports: [
    SharedModule,
  ],
})

export class CoreModule {}
