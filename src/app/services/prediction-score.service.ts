import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionScoreService {

  constructor(private http: HttpClient) {
  }

  updatePredictionScoreAlgemeen(tourId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/prediction-score/algemeen/${tourId}`, {})
  }
  updatePredictionScoreBerg(tourId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/prediction-score/berg/${tourId}`, {})
  }
  updatePredictionScorePunten(tourId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/prediction-score/punten/${tourId}`, {})
  }
  updatePredictionScoreJongeren(tourId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/prediction-score/jongeren/${tourId}`, {})
  }
  updatePredictionScoreEtappe(tourId: string, etappeId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/prediction-score/etappe/${tourId}/${etappeId}`, {})
  }



}
