import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtappeListPageRoutingModule } from './etappe-list-routing.module';

import { EtappeListPage } from './etappe-list.page';
import { AddEtappeModule } from 'src/app/components/add-etappe/add-etappe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtappeListPageRoutingModule,
    AddEtappeModule
  ],
  declarations: [EtappeListPage]
})
export class EtappeListPageModule {}
