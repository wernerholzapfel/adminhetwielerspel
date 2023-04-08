import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IStageClassification, ITourClassification} from '../models/etappe.model';
import {environment} from '../../environments/environment';

export enum ClassificationEndpoint {
  ALGEMEEN = 'tourclassifications',
  BERG = 'mountainclassifications',
  PUNTEN = 'pointsclassifications',
  JONGEREN = 'youthclassifications',
}

@Injectable()
export class ClassificationsService {


  constructor(private http: HttpClient) {
  }

  saveStageclassifications(body: IStageClassification[]): Observable<any> {
    return this.http.post<IStageClassification[]>(`${environment.apiBaseUrl}/stageclassifications`, body)
  }

  getStageClassifications(etappeId: string): Observable<IStageClassification[]> {
    return this.http.get<IStageClassification[]>(`${environment.apiBaseUrl}/stageclassifications/${etappeId}`);
  }

  getClassifications(tourId: string, endpoint: ClassificationEndpoint): Observable<ITourClassification[]> {
    return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/${endpoint}/${tourId}`);
  }
   saveClassifications(body: ITourClassification[], endpoint: ClassificationEndpoint): Observable<any> {
    return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/${endpoint}`, body)
  }
  // saveTourclassifications(body: ITourClassification[]): Observable<any> {
  //   return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/tourclassifications`, body)
  // }

  // getTourClassifications(tourId: string): Observable<ITourClassification[]> {
    // return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/tourclassifications/${tourId}`);
  // }

  // saveYouthclassifications(body: ITourClassification[]): Observable<any> {
  //   return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/youthclassifications`, body)
  // }

  // getYouthClassifications(tourId: string): Observable<ITourClassification[]> {
    // return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/youthclassifications/${tourId}`);
  // }

  // saveMountainclassifications(body: ITourClassification[]): Observable<any> {
  //   return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/mountainclassifications`, body)
  // }

  // getMountainClassifications(tourId: string): Observable<ITourClassification[]> {
    // return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/mountainclassifications/${tourId}`);
  // }

  // savePointsclassifications(body: ITourClassification[]): Observable<any> {
  //   return this.http.post<ITourClassification[]>(`${environment.apiBaseUrl}/pointsclassifications`, body)
  // }

  // getPointsClassifications(tourId: string): Observable<ITourClassification[]> {
    // return this.http.get<ITourClassification[]>(`${environment.apiBaseUrl}/pointsclassifications/${tourId}`);
  // }
}
