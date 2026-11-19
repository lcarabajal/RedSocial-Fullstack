import { Component, inject } from '@angular/core';
import { LoadingService } from '../../service/loading-service';

@Component({
  imports: [],
  selector: 'app-loading-component',
  styleUrl: './loading-component.css',
  templateUrl: './loading-component.html',
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
