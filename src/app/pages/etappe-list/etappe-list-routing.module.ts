import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtappeListPage } from './etappe-list.page';

const routes: Routes = [
  {
    path: '',
    component: EtappeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtappeListPageRoutingModule {}
