import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'task1',
    loadChildren: 'app/task1/task1.module#Task1Module'
  },
  {
    path: 'task2',
    loadChildren: 'app/task2/task2.module#Task2Module'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
