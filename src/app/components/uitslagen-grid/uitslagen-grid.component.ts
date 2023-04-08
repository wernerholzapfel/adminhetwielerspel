import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ALGEMEENKLASSEMENT_TEXT, BERGKLASSEMENT_TEXT, JONGERENKLASSEMENT_TEXT, PUNTENKLASSEMENT_TEXT } from 'src/app/constants/constants';
import { IStageClassification, ITourClassification } from 'src/app/models/etappe.model';
import { ITour } from 'src/app/models/tour.model';
import { ITourrider } from 'src/app/models/tourriders.model';
import { ClassificationEndpoint, ClassificationsService } from 'src/app/services/stageclassifications.service';
import { TourriderService } from 'src/app/services/tourrider.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-uitslagen-grid',
  templateUrl: './uitslagen-grid.component.html',
  styleUrls: ['./uitslagen-grid.component.scss'],
})
export class UitslagenGridComponent implements OnInit {

  unsubscribe = new Subject<void>();

  private _typeKlassement = ALGEMEENKLASSEMENT_TEXT
  @Input() set typeKlassement(value) {
    this._typeKlassement = value;
    if (value) {
      this.fetchKlassement(value)
    }
  }
  get typeKlassement() {
    return this._typeKlassement;
  }

  uitslag$: Observable<ITourClassification[]> = new Observable<[]>;
  uitslag: any[] = [];
  tourriders: ITourrider[] = [];

  constructor(private route: ActivatedRoute,
    private classificationService: ClassificationsService,
    private tourriderService: TourriderService,
    private uiService: UiService) { }

  ngOnInit() {

    // todo combinelatest zodat tourriders gefiltered kunnen worden met etappeuitslag.

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
    ev.detail.complete(this.uitslag);
    this.uitslag = this.orderUitslag(this.uitslag)
  }
  addTourriderToClassification(tourrider: ITourrider) {
    if (this.uitslag.length === 20) {
      // show toast
    }
    console.log(this.uitslag)
    this.uitslag = [...this.uitslag, {
      position: this.uitslag.length + 1,
      tour: this.uiService.selectedTour.getValue(),
      tourrider: tourrider
    }]

    console.log(this.uitslag)
    this.tourriders = this.tourriders.filter(item => item.id !== tourrider.id)
  }
  deleteFromUitslag(tourrider: ITourrider) {
    this.uitslag = this.orderUitslag(this.uitslag.filter(item => {
      return item.tourrider.id !== tourrider.id
    }))
    this.tourriders = [...this.tourriders, tourrider]
  }

  orderUitslag(uitslag: IStageClassification[]) {
    return uitslag.map((item, index) => {
      return {
        ...item,
        position: index + 1
      }
    })
  }

  fetchKlassement(klassementsType: string) {
    switch (klassementsType) {
      case BERGKLASSEMENT_TEXT:
        this.fetchClassification(ClassificationEndpoint.BERG);
        break;
      case JONGERENKLASSEMENT_TEXT:
        this.fetchClassification(ClassificationEndpoint.JONGEREN);
        break;
      case ALGEMEENKLASSEMENT_TEXT:
        this.fetchClassification(ClassificationEndpoint.ALGEMEEN);
        break;
      case PUNTENKLASSEMENT_TEXT:
        this.fetchClassification(ClassificationEndpoint.PUNTEN);
        break;
      default:
        console.log('default');
    }
  }

  private fetchClassification(endpoint: ClassificationEndpoint) {
    this.uiService.selectedTour.pipe(switchMap(tour => {
      if (tour && tour.id) {
        return this.classificationService.getClassifications(tour.id, endpoint);
      } else {
        return of(undefined);
      }
    })).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      if (response) {
        this.uitslag = response
      }
    });
  }

  save() {
    switch (this.typeKlassement) {
      case ALGEMEENKLASSEMENT_TEXT:
        this.submitClassification(ClassificationEndpoint.ALGEMEEN);
        break;
      case JONGERENKLASSEMENT_TEXT:
        this.submitClassification(ClassificationEndpoint.JONGEREN);
        break;
      case BERGKLASSEMENT_TEXT:
        this.submitClassification(ClassificationEndpoint.BERG);
        break;
      case PUNTENKLASSEMENT_TEXT:
        this.submitClassification(ClassificationEndpoint.PUNTEN);
        break;
      default:
        console.warn('geen classification opgeslagen');
    }
  }

  private submitClassification(endpoint: ClassificationEndpoint) {
    this.classificationService.saveClassifications(this.uitslag, endpoint).subscribe(response => {
    });
  }
}
