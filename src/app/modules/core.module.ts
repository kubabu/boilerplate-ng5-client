import { NgModule } from '@angular/core';
import { BarcodeDecoderService } from '../services/barcode/barcode-decoder.service';
import { BarcodeValidatorService } from '../services/barcode/barcode-validator.service';
import { HeroService, HeroHttpService } from '../services/hero.service';
import { SharedModule } from './shared.module';
import { MessageService } from 'app/services/message.service';
import { SidebarService } from '../services/sidebar.service';
import { ApiConfiguration } from '../config/api-config';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ApiConfiguration,
    SidebarService,
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
