import { Routes } from '@angular/router';
import { ErrorComponente } from './componentes/error/error';
import { adminGuard } from './guards/admin-guard';


export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./componentes/login/login').then(m => m.Login),
  },
  { 
    path: 'registro', 
    loadComponent: () => import('./componentes/registro/registro').then(m => m.Registro),
  },
  { 
    path: 'publicaciones', 
    children:[
      {
        path:'',
        loadComponent: () => import('./componentes/publicaciones/publicaciones').then(m => m.Publicaciones),
      },
      {
        path:':id',
        loadComponent: () => import('./componentes/publicacion-detalle/publicacion-detalle').then(m => m.PublicacionDetalle),
      }
    ]
  },
  { 
    path: 'mi-perfil', 
    loadComponent: () => import('./componentes/mi-perfil/mi-perfil').then(m => m.MiPerfil),
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./componentes/dashboard-usuarios/dashboard-usuarios').then(m => m.DashboardUsuarios),
    canActivate: [adminGuard] 
  },
  { 
    path: 'estadisticas', 
    loadComponent: () => import('./componentes/dashboard-estadisticas/dashboard-estadisticas').then(m => m.DashboardEstadisticas),
    canActivate: [adminGuard] 
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path:'**',
    component:ErrorComponente
  }
];
