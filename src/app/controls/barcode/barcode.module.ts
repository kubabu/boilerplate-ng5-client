import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BarcodeRouteModule } from './barcode.route';
import { BarcodeComponent } from './barcode.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MediaStreamComponent } from './media-stream/media-stream.component';
import { OpenMediaStreamComponent } from './open-media-stream/open-media-stream.component';

@NgModule({
  imports: [
    SharedModule,
    BarcodeRouteModule,
  ],
  declarations: [
    BarcodeComponent,
    InputFieldComponent,
    InputFieldComponent,
    MediaStreamComponent,
    OpenMediaStreamComponent,
  ],
})

export class BarcodeModule {}
