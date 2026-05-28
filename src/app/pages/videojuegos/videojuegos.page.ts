import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton, IonTextarea, IonBackButton
} from '@ionic/angular/standalone';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-videojuegos',
  standalone: true,
  templateUrl: './videojuegos.page.html',
  styleUrls: ['./videojuegos.page.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton, IonTextarea, IonBackButton
  ]
})
export class VideojuegosPage {

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
      const pos = await Geolocation.getCurrentPosition();

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

      console.log('ENCUESTA GUARDADA:', datos);

      // 🔥 4. AQUÍ GUARDAS EN TU BD
      // await this.servicio.crear(datos);

      alert('Encuesta enviada correctamente con ubicación');

    } catch (error) {
      console.error('Error GPS:', error);
      alert('No se pudo obtener la ubicación');
    }
  }
}