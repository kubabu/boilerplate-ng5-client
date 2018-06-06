import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'app/shared/core.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
  ],
})
export class PagesModule { }
