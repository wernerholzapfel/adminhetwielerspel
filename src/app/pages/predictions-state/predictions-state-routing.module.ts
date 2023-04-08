import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictionsStatePage } from './predictions-state.page';

const routes: Routes = [
  {
    path: '',
    component: PredictionsStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictionsStatePageRoutingModule {}
