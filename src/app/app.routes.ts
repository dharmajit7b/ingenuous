import { Routes } from '@angular/router';
import { ApplicantComponent } from './core/applicant/applicant.component';

export const routes: Routes = [
  { path: '', redirectTo: 'applicant', pathMatch: 'full' },
  {
    path: 'applicant',
    component: ApplicantComponent,
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './core/applicant/applicant-list/applicant-list.component'
          ).then((c) => c.ApplicantListComponent),
      },
      {
        path: 'form',
        loadComponent: () =>
          import(
            './core/applicant/applicant-form/applicant-form.component'
          ).then((c) => c.ApplicantFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './core/applicant/applicant-form/applicant-form.component'
          ).then((c) => c.ApplicantFormComponent),
      },
      {
        path: 'view/:id',
        loadComponent: () =>
          import(
            './core/applicant/applicant-form/applicant-form.component'
          ).then((c) => c.ApplicantFormComponent),
      },
      
    ],
  },
];
