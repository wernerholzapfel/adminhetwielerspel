import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { IRider } from '../models/rider.model';
import { ITour } from '../models/tour.model';
import { TourService } from './tour.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  selectedTour: BehaviorSubject<ITour> = new BehaviorSubject({id: ''});

  constructor(private tourService: TourService) {

    this.tourService.getActiveTour().subscribe(response => {
      this.selectedTour.next(response)
    })
  }

  filterRiders(searchTerm: string, riders: IRider[]) {
    console.log(riders.length)
    if ((searchTerm === undefined || searchTerm.length < 2)) {
      return [];
  } else {
      searchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return riders.filter(rider => {
          const searchableWords: string[] = (`${rider?.firstName} ${rider?.surName}`)
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .split(' ');

          return (!searchTerm || searchTerm
              .trim()
              .split(' ')
              .map(word => word)
              .filter(searchWord => {
                  return searchableWords.filter(searchableWord => {
                      return searchableWord.indexOf(searchWord.trim()) > -1;
                  }).length > 0;
              }).length > 0);
      });
  }
  }
//   async presentToast(message: string, color: string, keyboardClose = false) {
//     const toast = await this.toastController.create({
//         message: message,
//         duration: 3000,
//         position: 'top',
//         cssClass: 'custom-toast',
//         color,
//         keyboardClose
//     });

//     await toast.present();
// }
}
