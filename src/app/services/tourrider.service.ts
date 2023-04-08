import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITourrider } from '../models/tourriders.model';

@Injectable({
  providedIn: 'root'
})
export class TourriderService {

  constructor(private http: HttpClient) {
  }

  getTourriders(tourId: string): Observable<ITourrider[]> {
    return this.http.get<ITourrider[]>(`${environment.apiBaseUrl}/tourriders/tour/${tourId}`);
  }
  
  getTourridersForTeam(tourId: string,teamId: string): Observable<ITourrider[]> {
    return this.http.get<ITourrider[]>(`${environment.apiBaseUrl}/tourriders/tour/${tourId}/team/${teamId}`);
  }
  
  deleteTourrider(tourriderId: string): Observable<ITourrider> {
    return this.http.delete<ITourrider>(`${environment.apiBaseUrl}/tourriders/${tourriderId}`);
  }
}
