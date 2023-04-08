import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IEtappe } from 'src/app/models/etappe.model';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-etappe',
  templateUrl: './add-etappe.component.html',
  styleUrls: ['./add-etappe.component.scss'],
})
export class AddEtappeComponent implements OnInit {

  etappe: IEtappe = { etappeName: '', etappeNumber: undefined, date: undefined, tour: undefined }

  constructor(private modalCtrl: ModalController, private uiService: UiService) { }

  ngOnInit() {
    this.etappe.tour = this.uiService.selectedTour.getValue()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    return this.modalCtrl.dismiss(this.etappe, 'save');
  }

  setDatetime(event: any) {
    this.etappe.date = event.detail.value
  }
}
