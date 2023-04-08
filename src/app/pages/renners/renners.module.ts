import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RennersPageRoutingModule } from './renners-routing.module';

import { RennersPage } from './renners.page';
import { TeamComponent } from 'src/app/components/team/team.component';
import { TeamModule } from 'src/app/components/team/team.module';

@NgModule({
    declarations: [RennersPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RennersPageRoutingModule,
        TeamModule
    ]
})
export class RennersPageModule {}
