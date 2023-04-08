import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITour } from '../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) {
  }

  getActiveTour(): Observable<ITour> {
    return this.http.get<ITour>(`${environment.apiBaseUrl}/tour/active`)

  }
  
  getTourList(): Observable<ITour[]> {
    return this.http.get<ITour[]>(`${environment.apiBaseUrl}/tours`)

  }
}
