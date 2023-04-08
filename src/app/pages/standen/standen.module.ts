import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandenPageRoutingModule } from './standen-routing.module';

import { StandenPage } from './standen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandenPageRoutingModule
  ],
  declarations: [StandenPage]
})
export class StandenPageModule {}
