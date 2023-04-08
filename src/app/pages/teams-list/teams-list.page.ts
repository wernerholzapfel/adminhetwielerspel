import { Component, OnDestroy, OnInit } from '@angular/core';
import { CheckboxChangeEventDetail, IonCheckbox } from '@ionic/angular';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ITeam } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.page.html',
  styleUrls: ['./teams-list.page.scss'],
})
export class TeamsListPage implements OnInit, OnDestroy {

  constructor(private teamService: TeamService, private uiService: UiService) { }
  unsubscribe!: Subject<void>;

  teams$: Observable<ITeam[]> = new Observable<[]>
  teams: ITeam[] = []
  numberOfTeams = 0;

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    this.teams$ =
      this.uiService.selectedTour.pipe(switchMap(tour => {
        return tour.id ? this.teamService.getAllTeams(tour.id) : of([])
      })
      )
    this.teams$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
      console.log('joehoe')
      if (response) {
        this.teams = response
        this.numberOfTeams = response.filter(r => r.selected).length
        }
    })
  }

  setNumberOfSelected() {
    this.numberOfTeams = this.teams.filter(team => team.selected).length
  }

  AddOrRemoveTeamFromTour(event: any) {
    console.log(event.detail.checked)
    console.log(event.value)
  }

  saveTeams(list: ITeam[]) {
    const selectedTeams = list.filter(item => item.selected).map(i => {
      return { id: i.id }
    })

    this.teamService.addTeams({
      tour: this.uiService.selectedTour.getValue(),
      teams: selectedTeams
    }).subscribe(response => {
      console.log(response)
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }
}
