import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSpinner, IonRefresher, IonRefresherContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonModal, IonButton, IonIcon, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { VideojuegosService } from '../services/videojuegos.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSpinner, IonRefresher, IonRefresherContent,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonModal, IonButton, IonIcon, IonButtons
  ]
})
export class GaleriaPage implements OnInit {

  fotos: any[] = [];
  loading = false;
  fotoSeleccionada: any = null;
  modalAbierto = false;

  constructor(private videojuegosService: VideojuegosService) {
    addIcons({ closeOutline });
  }

  ngOnInit() {
    this.cargarFotos();
  }

  async cargarFotos() {
    this.loading = true;
    try {
      this.fotos = await this.videojuegosService.listarFotos();
    } catch (error) {
      console.error('Error al cargar fotos:', error);
    }
    this.loading = false;
  }

  async refrescar(event: any) {
    await this.cargarFotos();
    event.target.complete();
  }

  abrirFoto(foto: any) {
    this.fotoSeleccionada = foto;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.fotoSeleccionada = null;
  }
}