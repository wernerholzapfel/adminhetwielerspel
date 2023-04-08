import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IRider } from 'src/app/models/rider.model';
import { ITeam } from 'src/app/models/team.model';
import { ITourrider } from 'src/app/models/tourriders.model';
import { RiderService } from 'src/app/services/rider.service';
import { TeamService } from 'src/app/services/team.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-renners',
  templateUrl: './renners.page.html',
  styleUrls: ['./renners.page.scss'],
})
export class RennersPage implements OnInit, OnDestroy {

  constructor(private teamService: TeamService,
    private uiService: UiService,
    private riderService: RiderService) { }


  unsubscribe!: Subject<void>;

  teams$: Observable<ITeam[]> = new Observable<[]>
  riders: IRider[] = [];
  alreadySelectedRiderIds: string[] = []
  teams: ITeam[] = [];

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    this.teams$ = this.uiService.selectedTour
        .pipe(switchMap(tour => {
          return tour.id ? this.teamService.getTeamsForTour(tour.id) : of([])
        }))

    this.teams$.pipe(takeUntil(this.unsubscribe)).subscribe(teams => {
      this.teams = teams;
      this.alreadySelectedRiderIds = teams.reduce((accumulator: ITourrider[], currentValue) => {
        return [...accumulator, ...currentValue.tourRiders]
      }, []).map(tourrider => tourrider.rider.id)
    })


    this.uiService.selectedTour.pipe(switchMap(tour => {
      return tour.id ? this.riderService.getRiders() : of([])
    })).pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        this.riders = response;
      })
  }

  addRiderToAlreadySelected(rider: IRider) {
    this.alreadySelectedRiderIds = this.alreadySelectedRiderIds ?
      [...this.alreadySelectedRiderIds, rider.id] :
      this.alreadySelectedRiderIds
  }
  removeRiderFromAlreadySelected(rider: IRider) {
    this.alreadySelectedRiderIds = this.alreadySelectedRiderIds ?
      this.alreadySelectedRiderIds.filter(item => item !== rider.id):
      this.alreadySelectedRiderIds
  }

  trackByTeamId(index: number, item: ITeam) {
    return item ? item.id && item.tourRiders.length : undefined;
  }
  
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }
}
