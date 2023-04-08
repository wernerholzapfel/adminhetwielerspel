import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { UitslagenGridComponent } from './uitslagen-grid.component';


@NgModule({
    declarations: [UitslagenGridComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [UitslagenGridComponent]
})
export class UitslagenGridModule {
}
