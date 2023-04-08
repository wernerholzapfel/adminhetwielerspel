import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtappeUitslagPage } from './etappe-uitslag.page';

const routes: Routes = [
  {
    path: '',
    component: EtappeUitslagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtappeUitslagPageRoutingModule {}
