import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEtappe } from '../models/etappe.model';

@Injectable({
  providedIn: 'root'
})
export class EtappeService {

  constructor(private http: HttpClient) {
  }

  getEtappes(tourId: string): Observable<IEtappe[]> {
    return this.http.get<IEtappe[]>(`${environment.apiBaseUrl}/etappes/tour/${tourId}`);
  }

  // todo create model
  getLatestDrivenEtappe(tourId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/participants/table/${tourId}/latestetappe`);
  }

  saveEtappe(body: IEtappe): Observable<IEtappe> {
    return this.http.post<IEtappe>(`${environment.apiBaseUrl}/etappes`, body)
  }
}
