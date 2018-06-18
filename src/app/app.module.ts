import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'app/app.routing';
import { AppComponent } from 'app/app.component';
import { SidenavComponent } from 'app/shared/sidenav/sidenav.component';
import { FabMenuComponent } from 'app/shared/fab-menu/fab-menu.component';
import { CoreModule } from 'app/shared/core.module';
import { PagesModule } from 'app/controls/pages.module';
import { BarcodeModule } from 'app/controls/barcode/barcode.module';
import { UsersModule } from 'app/controls/users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FabMenuComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BarcodeModule,
    PagesModule,
    UsersModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {}

