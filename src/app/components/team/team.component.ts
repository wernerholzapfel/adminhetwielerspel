import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IRider } from 'src/app/models/rider.model';
import { ITeam } from 'src/app/models/team.model';
import { ITourrider } from 'src/app/models/tourriders.model';
import { RiderService } from 'src/app/services/rider.service';
import { TourriderService } from 'src/app/services/tourrider.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {

  @Output() addRiderToAlreadySelected: EventEmitter<IRider> = new EventEmitter<IRider>();
  @Output() removeRiderFromAlreadySelected: EventEmitter<IRider> = new EventEmitter<IRider>();

  private _team?: ITeam;
  @Input() set team(value) {
    this._team = value;
  }
  get team() {
    return this._team;
  }

  private _riders: IRider[] = [];
  @Input() set riders(value) {
    this._riders = value;
  }
  get riders() {
    return this._riders;
  }
  private _alreadySelectedRiders: string[] = [];
  @Input() set alreadySelectedRiders(value) {
    console.log('alreadySelectedRiders changed')
    this._alreadySelectedRiders = value;
  }
  get alreadySelectedRiders() {
    return this._alreadySelectedRiders;
  }

  searchedRiders: IRider[] = []
  unsubscribe!: Subject<void>;
  fetch$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  tourriders$: Observable<ITourrider[]> = new Observable<[]>

  isSearchActive = false;
  riderToSelect?: IRider;
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
  valueList = [200, 150, 120, 85, 65, 55, 40, 35, 25, 15, 10]

  constructor(private uiService: UiService,
    private riderService: RiderService,
    private tourridersService: TourriderService) { }

  ngOnInit() {
    this.unsubscribe = new Subject<void>();

    this.tourriders$ =
      combineLatest([this.fetch$, this.uiService.selectedTour])
        .pipe(takeUntil(this.unsubscribe))
        .pipe(switchMap(([fetch, tour]) => {
          return this.team ? this.tourridersService.getTourridersForTeam(tour.id, this.team.id) : of([])
        }))

    combineLatest([this.searchTerm$])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([searchTerm]) => {
        this.searchedRiders = this.uiService.filterRiders(searchTerm, this.riders.filter(rider => {
          return this.alreadySelectedRiders && !this.alreadySelectedRiders.includes(rider.id);
        }));
      });
  }

  search($event: any) {
    this.searchTerm$.next($event.detail.value);
  }
  setSearchState(isSearchActive: boolean, team?: ITeam) {
    this.isSearchActive = isSearchActive;
  }

  selectRider(rider: IRider) {
    this.searchTerm$.next('')
    this.riderToSelect = rider;
  }

  addRiderToTeam(value: number) {
    this.searchTerm$.next('')
    const rider = this.riderToSelect
    this.riderToSelect = undefined;

    this.riderService.addRidertoTeam({ tour: this.uiService.selectedTour.getValue(), team: this.team, rider: rider, waarde: value, })
      .subscribe(response => {
        this.fetch$.next(true);
        this.addRiderToAlreadySelected.emit(rider);

      })

  }
  deleteTourrider(tourrider: ITourrider) {
    this.tourridersService.deleteTourrider(tourrider.id)
      .subscribe(() => {
        this.fetch$.next(true);
        this.removeRiderFromAlreadySelected.emit(tourrider.rider);
      })

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

}