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
      this.uiService.presentToast('Opslaan gelukt')
    })
  }
    updateBerg() {
    this.predictionScoreService.updatePredictionScoreBerg(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
      this.uiService.presentToast('Opslaan gelukt')

    })
  }
  updatePunten() {
    this.predictionScoreService.updatePredictionScorePunten(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
      this.uiService.presentToast('Opslaan gelukt')

    })
  }
  updateJongeren() {
    this.predictionScoreService.updatePredictionScoreJongeren(this.uiService.selectedTour.getValue().id)
    .subscribe(response => {
      console.log(response)
      this.uiService.presentToast('Opslaan gelukt')

    })
  }

  updateStand() {
    console.log('todo')
  }
  updateRenners() {
    console.log('todo')
  }
}
