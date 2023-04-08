import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { AddEtappeComponent } from './add-etappe.component';


@NgModule({
    declarations: [AddEtappeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [AddEtappeComponent]
})
export class AddEtappeModule {
}
