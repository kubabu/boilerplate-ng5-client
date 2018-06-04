import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'app/app.routing';
import { AppComponent } from 'app/app.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
import { SidenavComponent } from 'app/shared/sidenav/sidenav.component';
import { FabMenuComponent } from 'app/shared/fab-menu/fab-menu.component';
import { CoreModule } from 'app/shared/core.module';
import { BarcodeModule } from 'app/barcode/barcode.module';
import { UsersModule } from 'app/users/users.module';
import { PagesModule } from 'app/pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
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

