import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredictionsStatePageRoutingModule } from './predictions-state-routing.module';

import { PredictionsStatePage } from './predictions-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredictionsStatePageRoutingModule
  ],
  declarations: [PredictionsStatePage]
})
export class PredictionsStatePageModule {}
