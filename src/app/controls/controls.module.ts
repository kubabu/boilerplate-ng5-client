import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'app/shared/core.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { HammerDemoComponent } from './hammer-demo/hammer-demo.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  declarations: [
    HammerDemoComponent,
    LoginComponent,
    LogoutComponent,
    MessagesComponent,
    NotFoundComponent,
  ],
})
export class ControlsModule { }
