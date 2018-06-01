import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { FabMenuComponent } from './shared/fab-menu/fab-menu.component';
import { CoreModule } from './shared/core.module';
import { BarcodeModule } from './barcode/barcode.module';
import { UsersModule } from 'app/users/users.module';

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
    UsersModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {}

