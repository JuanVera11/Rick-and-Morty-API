import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'character-detail/:id',
    loadComponent: () => import('./pages/character-detail/character-detail.page').then( m => m.CharacterDetailPage)
  },
];
