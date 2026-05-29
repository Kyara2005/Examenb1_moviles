// import { Component, OnInit } from '@angular/core';
// import {
//   IonHeader, IonToolbar, IonTitle, IonContent,
//   IonItem, IonLabel, IonInput, IonButton, IonButtons, IonBackButton, IonTextarea
// } from '@ionic/angular/standalone';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { VideojuegosService } from '../../services/videojuegos.page';

// @Component({
//   selector: 'app-videojuego-form',
//   templateUrl: './videojuego-form.page.html',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule, FormsModule,
//     IonHeader, IonToolbar, IonTitle, IonContent,
//     IonItem, IonLabel, IonInput, IonButton, IonButtons, IonBackButton, IonTextarea
//   ]
// })
// export class VideojuegoFormPage implements OnInit {

//   id?: number;
//   imagenFile!: File;
//   audioFile!: File;


//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private videojuegosService: VideojuegosService
//   ) {}

//   async ngOnInit() {
//     const idParam = this.route.snapshot.paramMap.get('id');

//     if (idParam) {
//       this.id = Number(idParam);
//       this.videojuego = await this.videojuegosService.obtenerPorId(this.id);
//     }
//   }

//   seleccionarImagen(event: any) {
//   this.imagenFile = event.target.files[0];
//   }

//   seleccionarAudio(event: any) {
//     this.audioFile = event.target.files[0];
//   }

//    async guardar() {
//     // SUBIR IMAGEN
//     if (this.imagenFile) {
//       this.videojuego.imagen =
//         await this.videojuegosService
//           .subirImagen(this.imagenFile);
//     }

//     // SUBIR AUDIO
//     if (this.audioFile) {
//       this.videojuego.audio =
//         await this.videojuegosService
//           .subirAudio(this.audioFile);
//     }

//     if (this.id) {
//       await this.videojuegosService.actualizar(this.id, this.videojuego);
//     } else {
//       await this.videojuegosService.crear(this.videojuego);
//     }
//     this.router.navigate(['/tabs/tab1']);
//   }
// }