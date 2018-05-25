import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MediaStreamComponent } from './media-stream/media-stream.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { BarcodeComponent } from './barcode.component';
import { OpenMediaStreamComponent } from './open-media-stream/open-media-stream.component';

export const BARCODE_ROUTE: Routes = [
  {
    path: '',
    component: BarcodeComponent,
    // do not use route for now
    // children: [
    //   {
    //     path: '',
    //     component: OpenMediaStreamComponent,
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: 'media',
    //     component: MediaStreamComponent,
    //     pathMatch: 'full',
    //   },
    // ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(BARCODE_ROUTE),
  ],
  exports: [
    RouterModule,
  ],
})
export class BarcodeRouteModule {}
