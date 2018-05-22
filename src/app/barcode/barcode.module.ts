import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BarcodeRouteModule } from './barcode.route';
import { BarcodeComponent } from './barcode.component';
import { InstantSearchComponent } from './instant-search/instant-search.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { MediaStreamComponent } from './media-stream/media-stream.component';
import { DummyPlaceholderComponent } from './dummy-placeholder/dummy-placeholder.component';

@NgModule({
  imports: [
    SharedModule,
    BarcodeRouteModule,
  ],
  declarations: [
    BarcodeComponent,
    InstantSearchComponent,
    InputFieldComponent,
    MediaStreamComponent,
    DummyPlaceholderComponent,
  ],
})

export class BarcodeModule {}
