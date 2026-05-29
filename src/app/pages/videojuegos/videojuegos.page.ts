import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton, IonTextarea, IonBackButton, IonSelect, IonSelectOption, IonLabel
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseService } from '../../services/firebase.service';
import { VideojuegosService } from '../../services/videojuegos.page';

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  templateUrl: './videojuegos.page.html',
  styleUrls: ['./videojuegos.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton, IonTextarea, IonBackButton, IonSelect, IonSelectOption, IonLabel
  ]
})
export class VideojuegosPage {

  mensajeExito = '';

  constructor(private router: Router, private firebaseService: FirebaseService, private videojuegosService: VideojuegosService) {}

  encuesta = {
    nombre: '',
    edad: '',
    rol: '',
    videojuego: '',
    plataforma: '',
    genero: '',
    comentario: ''
  };

  async enviarEncuesta() {
    try {

      // 🔥 1. GPS en el momento del click
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false, // false es más rápido
        timeout: 10000,            // 10 segundos de espera
      });

      const latitud = pos.coords.latitude;
      const longitud = pos.coords.longitude;

      // 🔥 2. fecha y hora
      const ahora = new Date();

      // 🔥 3. objeto final
      const datos = {
        ...this.encuesta,
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
        videojuego: '', plataforma: '', genero: '', comentario: ''
      };

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

