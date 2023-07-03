import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { PredictionScoreService } from 'src/app/services/prediction-score.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-standen',
  templateUrl: './standen.page.html',
  styleUrls: ['./standen.page.scss'],
})
export class StandenPage implements OnInit {

  constructor(private predictionScoreService: PredictionScoreService, private uiService: UiService, private notificationService: NotificationService) { }

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
  InvalidateCache() {
    this.predictionScoreService.invalidateCache()
      .subscribe(response => {
        console.log(response)
        this.uiService.presentToast('Cache geleegd')
      })
  }

  sendNotification() {
    this.notificationService.sendNotification()
      .subscribe(response => {
        console.log(response)
        this.uiService.presentToast('Notificatie verstuurd')
      })
  }

  updateStand() {
    console.log('todo')
  }
  updateRenners() {
    console.log('todo')
  }
}
