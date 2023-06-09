import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { TeamComponent } from './team.component';
import { EditTourriderModule } from '../edit-tourrider/edit-tourrider.module';


@NgModule({
    declarations: [TeamComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        EditTourriderModule,
    ],
    exports: [TeamComponent]
})
export class TeamModule {
}
