import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IEtappe } from 'src/app/models/etappe.model';
import { IRider } from 'src/app/models/rider.model';
import { ITourrider } from 'src/app/models/tourriders.model';
import { EtappeService } from 'src/app/services/etappe.service';
import { RiderService } from 'src/app/services/rider.service';
import { TourriderService } from 'src/app/services/tourrider.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-tourrider',
  templateUrl: './edit-tourrider.component.html',
  styleUrls: ['./edit-tourrider.component.scss'],
})
export class EditTourriderComponent implements OnInit, OnDestroy {

  @Input() tourrider: ITourrider;
  unsubscribe!: Subject<void>;

  public etappes: IEtappe[]
  public riders: IRider[]
  constructor(private modalCtrl: ModalController,
    private etappeService: EtappeService,
    private tourRiderService: TourriderService,
    private riderService: RiderService,
    private uiService: UiService) { }

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    console.log(this.tourrider)
    this.uiService.selectedTour
      .pipe(takeUntil(this.unsubscribe))
      .pipe(switchMap(tour => {
        return this.etappeService.getEtappes(tour.id)
      })).subscribe(etappes => {
        this.etappes = etappes
      })

    this.uiService.selectedTour
      .pipe(takeUntil(this.unsubscribe))
      .pipe(switchMap(tour => {
        return this.riderService.getRiders()
      })).subscribe(riders => {
        this.riders = riders.sort((a, b) => {
          if (a.surName < b.surName) {
            return -1;
          }
          if (a.surName > b.surName) {
            return 1;
          }
          return 0;
        })
      })
  }

  dismissModal() {
    this.modalCtrl.dismiss(this.tourrider, 'dismiss')
  }
  save() {
    this.modalCtrl.dismiss(this.tourrider, 'save')
  }

  setEtappe(event: any) {
    console.log(event.detail.value)
    this.tourrider.latestEtappe = {id:  event.detail.value.id};
  }
  
  toggleTourriderIsOut(event: any) {
    this.tourrider.isOut = event.detail.checked;
  }
  setRenner(event: any) {
    console.log(event.detail.value)
    this.tourrider.rider = event.detail.value;
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }
}


