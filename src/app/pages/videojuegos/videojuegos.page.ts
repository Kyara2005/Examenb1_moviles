import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonTextarea, IonBackButton, IonSelect, IonSelectOption, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FirebaseService } from '../../services/firebase.service';
import { VideojuegosService } from '../../services/videojuegos.page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  templateUrl: './videojuegos.page.html',
  styleUrls: ['./videojuegos.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton, IonTextarea, IonBackButton, IonSelect, IonSelectOption, IonLabel, IonButtons, CommonModule
]
})
export class VideojuegosPage {

  mensajeExito = '';
  fotoPreview: string | null = null;  // vista previa de la foto
  fotoFile: File | null = null;       // archivo para subir

  constructor(private router: Router, private firebaseService: FirebaseService, private videojuegosService: VideojuegosService) {}

  encuesta = {
    nombre: '',
    edad: '',
    rol: '',
    videojuego: '',
    plataforma: '',
    genero: '',
    comentario: '',
    lugar: '',
  };

  // Tomar foto con la cámara
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.fotoPreview = image.dataUrl ?? null;
    this.fotoFile = this.dataUrlToFile(image.dataUrl!, 'foto_encuesta.jpg');
  }

  // Seleccionar desde galería
  async seleccionarGaleria() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    this.fotoPreview = image.dataUrl ?? null;
    this.fotoFile = this.dataUrlToFile(image.dataUrl!, 'foto_encuesta.jpg');
  }
  // Convierte dataUrl a File para subir a Supabase
  private dataUrlToFile(dataUrl: string, filename: string): File {
    const [header, data] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)![1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new File([array], filename, { type: mime });
  }

  async enviarEncuesta() {
    try {

      // 🔥 1. GPS en el momento del click
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false, // false es más rápido
        timeout: 10000,            // 10 segundos de espera
      });

      const latitud = pos.coords.latitude;
      const longitud = pos.coords.longitude;

      // Subir foto si existe
      let fotoUrl = null;
      if (this.fotoFile) {
        fotoUrl = await this.videojuegosService.subirImagen(this.fotoFile);
      }

      // 🔥 2. fecha y hora
      const ahora = new Date();

      // 🔥 3. objeto final
      const datos = {
        ...this.encuesta,
        foto: fotoUrl,
        latitud,
        longitud,
        fecha: ahora.toLocaleDateString(),
        hora: ahora.toLocaleTimeString()
      };
      await this.videojuegosService.crearEncuesta(datos); // 👈 guarda en Supabase

      this.mensajeExito = 'Encuesta enviada correctamente';
      setTimeout(() => this.mensajeExito = '', 3000);

      // Limpiar formulario
      this.encuesta = {
        nombre: '', edad: '', rol: '',
        videojuego: '', plataforma: '', genero: '', comentario: '', lugar: ''
      };
      this.fotoPreview = null;
      this.fotoFile = null;

    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la encuesta');
    }
  }

  async cerrarSesion() {
    await this.firebaseService.logout();
    this.router.navigate(['/login']);
  }
} 

