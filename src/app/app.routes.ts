import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    children: [
      //Tab 1 - videojuegos con sus sub-rutas
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/videojuegos/videojuegos.page')
            .then(m => m.VideojuegosPage)
          },
          // {
          //   path: 'videojuego-form',
          //   loadComponent: () => import('./pages/videojuego-form/videojuego-form.page')
          //   .then(m => m.VideojuegoFormPage)
          // },
          // {
          //   path: 'videojuego-form/:id',
          //   loadComponent: () => import('./pages/videojuego-form/videojuego-form.page')
          //   .then(m => m.VideojuegoFormPage)
          // },
          {
            path: 'apilibros',
            loadComponent: () => import('./apilibros/apilibros.page').then( m => m.ApilibrosPage)
          }
        ]
      },
      {
        path: 'tab2',
        loadComponent: () => import('./tab2/tab2.page').then( m => m.Tab2Page)
      },
      {
        path: 'tab3',
        loadComponent: () => import('./tab3/tab3.page').then( m => m.Tab3Page)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  }
];