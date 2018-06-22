import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConfiguration } from 'app/config/api-config';
import { AuthenticationConfiguration } from 'app/config/auth-config';
import { RolesConfiguration } from 'app/config/roles-config';
import { SidebarMappingConfiguration } from 'app/config/sidebar-mapping-config';
import { BarcodeDecoderService } from 'app/controls/barcode/services/barcode-decoder.service';
import { BarcodeValidatorService } from 'app/controls/barcode/services/barcode-validator.service';
import { AuthenticationService } from 'app/services/auth/auth.service';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { AuthInterceptor } from 'app/services/interceptors/auth-interceptor.service';
import { CompletationOrdersDbService } from 'app/services/completation/completation-orders-db.service';
import { CompletationOrdersService } from 'app/services/completation/completation-orders.service';
import { UserService } from 'app/services/user.service';
import { PasswordErrorStateMatcher } from 'app/services/validators/password-validation.service';
import { MessageService } from 'app/services/message.service';
import { SharedModule } from 'app/shared/shared.module';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { SidebarMappingService } from 'app/shared/services/sidebar-mapping.service';
import { AuthNavigateService } from 'app/services/auth/auth-navigate.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    ApiConfiguration,
    AuthenticationConfiguration,
    SidebarMappingConfiguration,
    RolesConfiguration,
    AuthConnectorService,
    AuthNavigateService,
    AuthenticationStoreService,
    AuthenticationService,
    BarcodeValidatorService,
    BarcodeDecoderService,
    CompletationOrdersService,
    CompletationOrdersDbService,
    UserService,
    MessageService,
    SidebarService,
    SidebarMappingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    PasswordErrorStateMatcher,
  ],
  exports: [
    SharedModule,
  ],
})

export class CoreModule {}
