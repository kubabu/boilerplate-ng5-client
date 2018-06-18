import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConfiguration } from 'app/config/api-config';
import { AuthenticationConfiguration } from 'app/config/auth-config';
import { BarcodeDecoderService } from 'app/controls/barcode/services/barcode-decoder.service';
import { BarcodeValidatorService } from 'app/controls/barcode/services/barcode-validator.service';
import { AuthenticationService } from 'app/services/auth/auth.service';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { AuthInterceptor } from 'app/services/auth/auth-interceptor.service';
import { CompletationOrdersDbService } from 'app/services/completation/completation-orders-db.service';
import { CompletationOrdersService } from 'app/services/completation/completation-orders.service';
import { UserService } from 'app/services/user.service';
import { MessageService } from 'app/services/message.service';
import { SharedModule } from 'app/shared/shared.module';
import { SidebarService } from 'app/shared/services/sidebar.service';

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
    CompletationOrdersService,
    CompletationOrdersDbService,
    UserService,
    MessageService,
    SidebarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    SharedModule,
  ],
})

export class CoreModule {}
