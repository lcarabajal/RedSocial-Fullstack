import { Injectable, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private router = inject(Router);

  // Controla si se muestra o no el modal de advertencia
  mostrarModalAdvertencia = signal<boolean>(false);
  segundosRestantes = signal<number>(0);

  private intervalId: any = null;
  private readonly KEY_ADVERTENCIA = 'session_advertencia_mostrada';

  // Para pruebas: 30 segundos. Para producción: cámbialo a 10 * 60 (600 segundos = 10 min)
  private readonly SEGUNDOS_ADVERTENCIA = 10*60;

  iniciarMonitoreo() {
    this.detenerMonitoreo(); // Evita intervalos duplicados

    this.intervalId = setInterval(() => {
      this.verificarExpiracion();
    }, 1000);
  }

  detenerMonitoreo() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private verificarExpiracion() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.detenerMonitoreo();
      return;
    }

    try {
      // Decodificamos el payload del JWT (segunda sección separada por puntos)
      const payloadBase64 = token.split('.')[1];
      const payloadJson = JSON.parse(atob(payloadBase64));

      if (!payloadJson.exp || !payloadJson.iat) return;

      const ahoraMs = Date.now();
      const iatMs = payloadJson.iat * 1000;
      const expMs = payloadJson.exp * 1000;

      const segundosTranscurridos = Math.floor((ahoraMs - iatMs) / 1000);
      const diferenciaSegundos = Math.floor((expMs - ahoraMs) / 1000);
    
      this.segundosRestantes.set(Math.max(0, diferenciaSegundos));

      // Caso 1: El token expiró completamente
      if (diferenciaSegundos <= 0) {
        this.cerrarSesionExpirada();
        return;
      }

      const yaAvisoParaEsteToken = localStorage.getItem(this.KEY_ADVERTENCIA) === String(payloadJson.exp);
        
      if (segundosTranscurridos >= this.SEGUNDOS_ADVERTENCIA && !yaAvisoParaEsteToken) {
        localStorage.setItem(this.KEY_ADVERTENCIA, String(payloadJson.exp));
        this.mostrarModalAdvertencia.set(true);
      }

    } catch (e) {
      this.detenerMonitoreo();
    }
  }

  ocultarModal() {
    this.mostrarModalAdvertencia.set(false);
  }

  cerrarSesionExpirada() {
    this.detenerMonitoreo();
    this.mostrarModalAdvertencia.set(false);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem(this.KEY_ADVERTENCIA);
    this.router.navigate(['/login']);
  }
}