import { NgModule } from '@angular/core';
import { ApiConfiguration } from 'app/config/api-config';
import { AuthenticationConfiguration } from 'app/config/auth-config';
import { BarcodeDecoderService } from 'app/barcode/services/barcode-decoder.service';
import { BarcodeValidatorService } from 'app/barcode/services/barcode-validator.service';
import { UserService } from 'app/services/user.service';
import { MessageService } from 'app/services/message.service';
import { SharedModule } from 'app/shared/shared.module';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { AuthConnectorService } from 'app/shared/services/auth-connector.service';
import { AuthenticationService } from 'app/shared/services/auth.service';
import { AuthenticationStoreService } from 'app/shared/services/auth-store.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ApiConfiguration,
    AuthenticationConfiguration,
    AuthConnectorService,
    AuthenticationStoreService,
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
