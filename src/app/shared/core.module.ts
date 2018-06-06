import { NgModule } from '@angular/core';
import { BarcodeDecoderService } from '../barcode/services/barcode-decoder.service';
import { BarcodeValidatorService } from '../barcode/services/barcode-validator.service';
import { UserService } from '../services/user.service';
import { SharedModule } from './shared.module';
import { MessageService } from 'app/services/message.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { ApiConfiguration } from '../config/api-config';
import { AuthenticationService } from './services/auth.service';
import { AuthConnectorService } from 'app/shared/services/auth-connector.service';
import { AuthenticationConfiguration } from '../config/auth-config';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ApiConfiguration,
    AuthenticationConfiguration,
    AuthConnectorService,
    AuthenticationService,
    BarcodeValidatorService,
    BarcodeDecoderService,
    UserService,
    MessageService,
    SidebarService,
  ],
  exports: [
    SharedModule,
  ],
})

export class CoreModule {}
