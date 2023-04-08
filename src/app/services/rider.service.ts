import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddRidertoTeam, IRider } from '../models/rider.model';
import { ITour } from '../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class RiderService {



  constructor(private http: HttpClient) {
  }

  getRiders(): Observable<IRider[]> {
    return this.http.get<IRider[]>(`${environment.apiBaseUrl}/riders`);
  }
  
  addRidertoTeam(body: AddRidertoTeam): Observable<ITour> {
    return this.http.post<ITour>(`${environment.apiBaseUrl}/tourriders`, body)
  }
}
