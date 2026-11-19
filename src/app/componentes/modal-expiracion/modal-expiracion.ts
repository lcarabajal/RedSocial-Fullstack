import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../service/session-service';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-modal-expiracion',
  styleUrl: './modal-expiracion.css',
  templateUrl: './modal-expiracion.html',
})
export class ModalExpiracion {
  sessionService = inject(SessionService);
  private http = inject(HttpClient);

  cerrar() {
    this.sessionService.ocultarModal()
  }

  extenderSesion() {
    this.http.post<{token: string}>('https://red-social-back-end.vercel.app/auth/refrescar', {}).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.sessionService.mostrarModalAdvertencia.set(false);
      
      }
    });
  }
}
