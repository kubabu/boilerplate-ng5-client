import { NgModule } from '@angular/core';
import { BarcodeDecoderService } from '../barcode/services/barcode-decoder.service';
import { BarcodeValidatorService } from '../barcode/services/barcode-validator.service';
import { UserService, UserHttpService } from '../services/user.service';
import { SharedModule } from './shared.module';
import { MessageService } from 'app/services/message.service';
import { SidebarService } from '../shared/services/sidebar.service';
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
    { provide: UserService, useClass: UserHttpService },
    MessageService,
  ],
  exports: [
    SharedModule,
  ],
})

export class CoreModule {}
