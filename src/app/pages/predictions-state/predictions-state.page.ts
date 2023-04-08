import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { PredictionStateService } from 'src/app/services/prediction-state.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-predictions-state',
  templateUrl: './predictions-state.page.html',
  styleUrls: ['./predictions-state.page.scss'],
})
export class PredictionsStatePage implements OnInit {

  constructor(private predictionStateService: PredictionStateService,
    private uiService: UiService) { }
  unsubscribe!: Subject<void>;
  predictionState$: Observable<any[]> = new Observable<[]>
  predictionState: any[] = []
  fetch$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    this.predictionState$ =
      combineLatest([this.fetch$, this.uiService.selectedTour])
        .pipe(takeUntil(this.unsubscribe))
        .pipe(switchMap(([fetch, tour]) => {
          return tour && tour.id ? this.predictionStateService.getPredictionState(tour.id) : of([])
        }))

    this.predictionState$.pipe((takeUntil(this.unsubscribe)))
      .subscribe(response => {

        this.predictionState = response.map(item => {
          return {
            ...item,
            compleet: parseInt(item.renners) === 11 &&
              parseInt(item.meesterknecht) === 1 &&
              parseInt(item.beschermderenner) === 1 &&
              parseInt(item.waterdrager) === 1 &&
              parseInt(item.joker) === 1 &&
              parseInt(item.waardeJoker) === 10 &&
              parseInt(item.waardeBeschermderenner) === parseInt(item.waardeMeesterknecht) &&
              parseInt(item.totaalRenners) === 15 && parseInt(item.waardeRenners) <= 800
          }
        })
      })
  }

  getText(prediction: any) {
    return parseInt(prediction.totaalRenners) === 15 && parseInt(prediction.waardeRenners) < 801 ? 'Compleet' : 'Incompleet'
  }
}
