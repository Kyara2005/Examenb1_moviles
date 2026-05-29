import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonSpinner, IonRefresher, IonRefresherContent,
  IonBadge
} from '@ionic/angular/standalone';
import { VideojuegosService } from '../../services/videojuegos.page';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonSpinner, IonRefresher, IonRefresherContent,
    IonBadge
  ]
})
export class RegistrosPage implements OnInit {

  encuestas: any[] = [];
  loading = false;

  constructor(private videojuegosService: VideojuegosService) {}

  ngOnInit() {
    this.cargarEncuestas();
  }

  async cargarEncuestas() {
    this.loading = true;
    try {
      this.encuestas = await this.videojuegosService.listarEncuestas();
    } catch (error) {
      console.error('Error al cargar encuestas:', error);
    }
    this.loading = false;
  }

  async refrescar(event: any) {
    await this.cargarEncuestas();
    event.target.complete();
  }
}