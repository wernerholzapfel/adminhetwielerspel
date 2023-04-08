import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItem, ItemReorderEventDetail } from '@ionic/angular';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IStageClassification } from 'src/app/models/etappe.model';
import { ITourrider } from 'src/app/models/tourriders.model';
import { EtappeService } from 'src/app/services/etappe.service';
import { PredictionScoreService } from 'src/app/services/prediction-score.service';
import { ClassificationsService } from 'src/app/services/stageclassifications.service';
import { TourriderService } from 'src/app/services/tourrider.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-etappe-uitslag',
  templateUrl: './etappe-uitslag.page.html',
  styleUrls: ['./etappe-uitslag.page.scss'],
})
export class EtappeUitslagPage implements OnInit {

  etappeUitslag$: Observable<IStageClassification[]> = new Observable<[]>;
  etappeUitslag: IStageClassification[] = [];
  tourriders: ITourrider[] = [];
  unsubscribe!: Subject<void>;

  constructor(private route: ActivatedRoute,
    private classificationService: ClassificationsService,
    private tourriderService: TourriderService,
    private predictionScoreService: PredictionScoreService,
    private uiService: UiService) { }

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    // todo combinelatest zodat tourriders gefiltered kunnen worden met etappeuitslag.

    this.classificationService.getStageClassifications(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.etappeUitslag = response
      })

    this.uiService.selectedTour
      .pipe(takeUntil(this.unsubscribe))
      .pipe(switchMap(tour => {
        return tour && tour.id ? this.tourriderService.getTourriders(tour.id) : of([])
      }))
      .subscribe(tourriders => {
        this.tourriders = tourriders
      })
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete(this.etappeUitslag);
    this.etappeUitslag = this.orderEtappeUitslag(this.etappeUitslag)
  }
  addTourriderToStageClassification(tourrider: ITourrider) {
    if (this.etappeUitslag.length === 20) {
      // show toast
    }
    this.etappeUitslag = [...this.etappeUitslag, {
      position: this.etappeUitslag.length + 1,
      tour: this.uiService.selectedTour.getValue(),
      etappe: { id: this.route.snapshot.params['id'] },
      tourrider: tourrider
    }]

    this.tourriders = this.tourriders.filter(item => item.id !== tourrider.id)
  }
  deleteFromEtappe(tourrider: ITourrider) {
    this.etappeUitslag = this.orderEtappeUitslag(this.etappeUitslag.filter(item => {
      return item.tourrider.id !== tourrider.id
    }))
    this.tourriders = [...this.tourriders, tourrider]
  }

  orderEtappeUitslag(etappeUitslag: IStageClassification[]) {
    return etappeUitslag.map((item, index) => {
      return {
        ...item,
        position: index + 1
      }
    })
  }

  save() {
    this.classificationService.saveStageclassifications(this.etappeUitslag).subscribe(response => {
      console.log(response)
    })
  }

  updatePredictionScore() {
    this.predictionScoreService.updatePredictionScoreEtappe(this.uiService.selectedTour.getValue().id, this.route.snapshot.params['id'])
      .subscribe(response => {
        console.log(response);
      })
  }
}