import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { EditTourriderComponent } from './edit-tourrider.component';


@NgModule({
    declarations: [EditTourriderComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [EditTourriderComponent]
})
export class EditTourriderModule {
}
