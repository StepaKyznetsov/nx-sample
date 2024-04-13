import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  // {
  //   path: 'home',
  //   loadComponent: () => import('@nx-sample/some-component').then((m) => m.SomeComponent),
  // }
];
