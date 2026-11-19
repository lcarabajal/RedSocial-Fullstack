import { Injectable, signal, inject } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private router = inject(Router);
  private timeoutId: any = null;

  estaCargando = signal<boolean>(false);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.estaCargando.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Pequeña pausa (300ms) para que la animación se llegue a apreciar y no haga un parpadeo brusco
        this.timeoutId = setTimeout(() => {
          this.estaCargando.set(false);
        }, 300);
      }
    });
  }
}