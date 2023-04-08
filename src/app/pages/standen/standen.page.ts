import { Component, OnInit } from '@angular/core';
import { PredictionScoreService } from 'src/app/services/prediction-score.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-standen',
  templateUrl: './standen.page.html',
  styleUrls: ['./standen.page.scss'],
})
export class StandenPage implements OnInit {

  constructor(private predictionScoreService: PredictionScoreService, private uiService: UiService) { }

  ngOnInit() {
  }

  updateAlgemeen() {
    this.predictionScoreService.updatePredictionScoreAlgemeen(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
    })
  }
    updateBerg() {
    this.predictionScoreService.updatePredictionScoreBerg(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
    })
  }
  updatePunten() {
    this.predictionScoreService.updatePredictionScorePunten(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
    })
  }
  updateJongeren() {
    this.predictionScoreService.updatePredictionScoreJongeren(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
    })
  }

  updateStand() {
    console.log('todo')
  }
  updateRenners() {
    console.log('todo')
  }
}
