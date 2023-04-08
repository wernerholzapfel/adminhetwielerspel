import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IHeadline } from 'src/app/models/headline.model';
import { HeadlineService } from 'src/app/services/headline.service';
import { UiService } from 'src/app/services/ui.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.page.html',
  styleUrls: ['./headlines.page.scss'],
})
export class HeadlinesPage implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen = false;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  headline?: IHeadline
  headlines$: Observable<IHeadline[]> = new Observable<[]>
  unsubscribe!: Subject<void>;
  fetch$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private headlineService: HeadlineService, private uiService: UiService) { }

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    this.headlines$ =
      combineLatest([this.fetch$, this.uiService.selectedTour])
        .pipe(takeUntil(this.unsubscribe))
        .pipe(switchMap(([fetch, tour]) => {
          return tour && tour.id ? this.headlineService.getHeadlines(tour.id) : of([])
        }))

    this.setHeadlineEmpty()
  }

  editHeadline(headline: IHeadline) {
    this.headline = headline
    this.isModalOpen = true

  }

  addHeadline() {
    console.log('addheadline')
    this.setHeadlineEmpty()
    this.isModalOpen = true
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
    this.fetch$.unsubscribe()
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.setHeadlineEmpty()
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const tour = this.uiService.selectedTour.getValue()
      if (this.headline && this.uiService.selectedTour.getValue()) {
        this.headlineService.saveHeadline({ ...this.headline, tour }).subscribe(response => {
          console.log(response)
        })
      }
    }
  }

  setHeadlineEmpty() {
    this.headline = { title: '', text: '', isActive: true }
  }
}
