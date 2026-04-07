import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('@pages/idea-form/idea-form.component').then((m) => m.IdeaFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('@pages/idea-form/idea-form.component').then((m) => m.IdeaFormComponent),
      },
    ],
  },
];
