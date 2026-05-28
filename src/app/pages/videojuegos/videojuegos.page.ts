import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonFab, IonFabButton, IonBackButton
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideojuegosService, Videojuego } from '../../services/videojuegos.page';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-videojuegos',
  templateUrl: './videojuegos.page.html',
  standalone: true,
  styleUrls: ['./videojuegos.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton,
    IonFab, IonFabButton, IonBackButton
  ]
})
export class VideojuegosPage implements OnInit {

  videojuegos: Videojuego[] = [];

  //Variable para el video
  videoUrl: string = '';
  // imagen
  imagenVisible: number | null = null;

  constructor(private videojuegosService: VideojuegosService, private sanitizer: DomSanitizer, private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.cargar();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  async cargar() {
    this.videojuegos = await this.videojuegosService.listar();
  }

  async eliminar(id: number) {
    await this.videojuegosService.eliminar(id);
    await this.cargar();
  }

  //Convertir links de youtube a formato embebido
  convertirYoutubeUrl(url: string): string {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  }

  // MOSTRAR / OCULTAR VIDEO
  mostrarVideo(url: string) {
    // EVITAR LINKS VACIOS
    if (!url || url === 'sin enlace') {
      alert('Este videojuego no tiene trailer');
      return;
    }

    if (this.videoUrl === url) {
      this.videoUrl = '';
    } else {
      this.videoUrl = url;
    }
  }

  // MOSTRAR / OCULTAR IMAGEN
  toggleImagen(id: number) {
    if (this.imagenVisible === id) {
      this.imagenVisible = null;
    } else {
      this.imagenVisible = id;
    }
  }

  //Función para obtener la URL segura del video
  getVideoUrl(url: string): SafeResourceUrl {
    // SI NO HAY LINK
    if (!url || url === 'sin enlace') {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    let embedUrl = url;

    // FORMATO watch?v=
    if (url.includes('watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/');
    }

    // FORMATO youtu.be
    else if (url.includes('youtu.be/')) {
      const videoId = url
        .split('youtu.be/')[1]
        .split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return this.sanitizer
      .bypassSecurityTrustResourceUrl(embedUrl);

  }

  // Logout
  async cerrarSesion() {
    await this.firebaseService.logout();
    this.router.navigate(['/login']);
  }
}