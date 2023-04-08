import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AddEtappeComponent } from 'src/app/components/add-etappe/add-etappe.component';
import { IEtappe } from 'src/app/models/etappe.model';
import { EtappeService } from 'src/app/services/etappe.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-etappe-list',
  templateUrl: './etappe-list.page.html',
  styleUrls: ['./etappe-list.page.scss'],
})
export class EtappeListPage implements OnInit {

  etappes$: Observable<IEtappe[]> = new Observable<[]>
  unsubscribe!: Subject<void>;
  fetch$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private uiService: UiService,
    private etappeService: EtappeService,
    private router: Router,
    private modalCtrl: ModalController) { }


  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    this.etappes$ =
      combineLatest([this.fetch$, this.uiService.selectedTour])
        .pipe(takeUntil(this.unsubscribe))
        .pipe(switchMap(([fetch, tour]) => {
          return tour && tour.id ? this.etappeService.getEtappes(tour.id) : of([])
        }))
  }
  async addEtappe() {
    const modal = await this.modalCtrl.create({
      component: AddEtappeComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save') {
      this.etappeService.saveEtappe(data).subscribe(response => {
        console.log(response);
        this.fetch$.next(true);
      })
    }
  }

  navigateToEtappeUitslag(etappeId?: string) {
    this.router.navigate(['etappe-uitslag', etappeId])
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
    this.fetch$.unsubscribe()
  }
}
