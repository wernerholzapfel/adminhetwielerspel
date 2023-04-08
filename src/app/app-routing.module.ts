import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tour',
    pathMatch: 'full'
  },
  {
    path: 'teams',
    loadChildren: () => import('./pages/teams-list/teams-list.module').then( m => m.TeamsListPageModule)
  },
  {
    path: 'renners',
    loadChildren: () => import('./pages/renners/renners.module').then( m => m.RennersPageModule)
  },
  {
    path: 'etappes',
    loadChildren: () => import('./pages/etappe-list/etappe-list.module').then( m => m.EtappeListPageModule)
  },
  {
    path: 'headlines',
    loadChildren: () => import('./pages/headlines/headlines.module').then( m => m.HeadlinesPageModule)
  },
  {
    path: 'etappe-uitslag/:id',
    loadChildren: () => import('./pages/etappe-uitslag/etappe-uitslag.module').then( m => m.EtappeUitslagPageModule)
  },
  {
    path: 'klassementen',
    loadChildren: () => import('./pages/klassementen/klassementen.module').then( m => m.KlassementenPageModule)
  },
  {
    path: 'tour',
    loadChildren: () => import('./pages/tour/tour.module').then( m => m.TourPageModule)
  },
  {
    path: 'standen',
    loadChildren: () => import('./pages/standen/standen.module').then( m => m.StandenPageModule)
  }, {
    path: 'login',
    loadChildren: () => import('./pages/standen/standen.module').then( m => m.StandenPageModule)
  },
  {
    path: 'predictions-state',
    loadChildren: () => import('./pages/predictions-state/predictions-state.module').then( m => m.PredictionsStatePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
