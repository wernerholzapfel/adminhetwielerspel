import { Component } from '@angular/core';
import { UiService } from './services/ui.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Tour', url: '/tour', icon: 'bicycle' },
    { title: 'Teams', url: '/teams', icon: 'people' },
    { title: 'Renners', url: '/renners', icon: 'person-add' },
    { title: 'Voorspellingen', url: '/predictions-state', icon: 'navigate' },
    { title: 'Etappes', url: '/etappes', icon: 'navigate' },
    { title: 'Klassementen', url: '/klassementen', icon: 'medal' },
    { title: 'Headlines', url: '/headlines', icon: 'newspaper' },
    { title: 'Standen', url: '/standen', icon: 'podium' },
  ];

  constructor(public uiService: UiService) {}
}
