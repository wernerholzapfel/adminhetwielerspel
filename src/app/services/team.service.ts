import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { ITeam } from '../models/team.model';
import { AddTeamsRequest, ITour } from '../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getAllTeams(tourId: string): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${environment.apiBaseUrl}/teams/admin/tour/${tourId}`)
      .pipe(map(response => {
        return response.sort((a, b) => {
          if (a.teamName > b.teamName) {
            return 1;
          }
          if (a.teamName < b.teamName) {
            return -1;
          }
          return 0;
        });
      }));
  }
  getTeamsForTour(tourId: string): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${environment.apiBaseUrl}/teams/tour/${tourId}`)
  }

  addTeams(body: AddTeamsRequest): Observable<ITour> {
    return this.http.post<ITour>(`${environment.apiBaseUrl}/tours/setteams`, body)
  }
}
