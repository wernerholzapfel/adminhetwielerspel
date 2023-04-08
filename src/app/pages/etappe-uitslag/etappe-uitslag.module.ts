import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtappeUitslagPageRoutingModule } from './etappe-uitslag-routing.module';

import { EtappeUitslagPage } from './etappe-uitslag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtappeUitslagPageRoutingModule
  ],
  declarations: [EtappeUitslagPage]
})
export class EtappeUitslagPageModule {}
