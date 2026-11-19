import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // Configuración base acorde al tema oscuro de tu app
  private swalOscuro = Swal.mixin({
    background: '#1e293b',
    color: '#f8fafc',
    confirmButtonColor: '#00d2ff',
    cancelButtonColor: '#ef4444',
  });

  exito(titulo: string, texto?: string) {
    return this.swalOscuro.fire({
      icon: 'success',
      title: titulo,
      text: texto,
      confirmButtonText: 'Aceptar',
    });
  }

  error(titulo: string, texto?: string) {
    return this.swalOscuro.fire({
      icon: 'error',
      title: titulo,
      text: texto,
      confirmButtonText: 'Entendido',
    });
  }

  advertencia(titulo: string, texto?: string) {
    return this.swalOscuro.fire({
      icon: 'warning',
      title: titulo,
      text: texto,
      confirmButtonText: 'Aceptar',
    });
  }

  // Ideal para reemplazar confirm() antes de deshabilitar un usuario o borrar un post
  async confirmar(
    titulo: string,
    texto: string,
    textoConfirmar: string = 'Sí, continuar'
  ): Promise<boolean> {
    const resultado = await this.swalOscuro.fire({
      icon: 'question',
      title: titulo,
      text: texto,
      showCancelButton: true,
      confirmButtonText: textoConfirmar,
      cancelButtonText: 'Cancelar',
    });

    return resultado.isConfirmed;
  }

  // Notificación rápida en la esquina superior derecha (no bloquea la pantalla)
  toast(titulo: string, icono: SweetAlertIcon = 'success') {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icono,
      title: titulo,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#1e293b',
      color: '#f8fafc',
    });
  }
}