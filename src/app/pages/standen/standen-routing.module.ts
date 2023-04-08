import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandenPage } from './standen.page';

const routes: Routes = [
  {
    path: '',
    component: StandenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandenPageRoutingModule {}
