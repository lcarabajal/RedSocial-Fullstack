import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IPublicacion } from '../../interfaces/interfaces';
import { Sidebar } from '../sidebar/sidebar';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../service/alert-service';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule, DatePipe, Sidebar, RouterLink],
  templateUrl: './publicacion.html',
  styleUrls: ['./publicacion.css']
})
export class Publicacion {
  private sweetAlert = inject(AlertService);
  @Input({ required: true }) publicacion!: IPublicacion;
  @Input({ required: true }) currentUserId!: string;
  
  @Output() onLike = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  get hasLiked(): boolean {
    return this.publicacion.likes.includes(this.currentUserId);
  }

  toggleLike() {
    this.onLike.emit(this.publicacion._id);
  }

  async eliminar() {
    if (await this.sweetAlert.confirmar('¿Estás seguro de eliminar esta publicación?','La publicación se eliminara PERMANENTEMENTE','Seguro!')) {
      this.onDelete.emit(this.publicacion._id);
    }
  }
}