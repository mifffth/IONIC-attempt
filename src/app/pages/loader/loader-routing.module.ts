import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoaderPage } from './loader.page';

const routes: Routes = [
  {
    // penamaan test buat rute web, bisa diganti. localhost:nnnn/loader/test 
    path: '', 
    component: LoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoaderPageRoutingModule {}


