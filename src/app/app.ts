import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ModalExpiracion } from './componentes/modal-expiracion/modal-expiracion';
import { SessionService } from './service/session-service';
import { LoadingComponent } from './componentes/loading-component/loading-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalExpiracion, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('redSocial');
  private sessionService = inject(SessionService);

  // isAppLoading = signal(true); // Pantalla de carga inicial

  ngOnInit() {
    // setTimeout(() => {
    //   console.log('Pasan 1.5 segundos...');
    //   this.isAppLoading.set(false);
    // },1500);

    if(localStorage.getItem('token')){
      this.sessionService.iniciarMonitoreo();
    }
  }
}
