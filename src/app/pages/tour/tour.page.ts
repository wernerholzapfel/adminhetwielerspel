import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITour } from 'src/app/models/tour.model';
import { TourService } from 'src/app/services/tour.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {

  constructor(private tourService: TourService, private uiService: UiService) { }

  tours$: Observable<ITour[]> = new Observable<[]>

  ngOnInit() {
    this.tours$ =
      this.tourService.getTourList();
  }

  setActive(tour: ITour) {
    this.uiService.selectedTour.next(tour);
  }
}
