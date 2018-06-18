import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BarcodeComponent } from './barcode.component';

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
