import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonList, IonItem, IonInput, IonLabel, IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonCardSubtitle, IonSpinner } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http'; // Importa HttpClientModule si necesitas hacer peticiones HTTP
//Implementacion de api

@Component({
  selector: 'app-apilibros',
  templateUrl: './apilibros.page.html',
  styleUrls: ['./apilibros.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonList, IonItem, IonInput, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSpinner, CommonModule, FormsModule]
})
export class ApilibrosPage implements OnInit {

  textoBusqueda: string = ''; // texto de búsqueda ingresado por el usuario (filtrado local)
  loading = false; // Variable para controlar el estado de carga
  juegos: any[] = []; // Aquí almacenarás los juegos obtenidos de la API

  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.obtenerJuegos();
  }

  obtenerJuegos() {
    this.loading = true;
    const url = `https://www.freetogame.com/api/games`;
    this.http.get<any[]>(url)
      .subscribe(
        data => {
          // Si hay texto de búsqueda, filtramos localmente por título
          const q = this.textoBusqueda?.trim().toLowerCase();
          this.juegos = q ? data.filter(g => g.title?.toLowerCase().includes(q)) : data;
          this.loading = false;
        },
        error => {
          console.error('Error al obtener juegos:', error);
          this.loading = false;
        }
      );
  }

}
