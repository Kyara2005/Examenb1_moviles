import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonCard, IonCardContent, IonLabel
} from '@ionic/angular/standalone';
import QRCode from 'qrcode';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonCard, IonCardContent, IonLabel
  ]
})
export class BienvenidaPage implements OnInit {

  @ViewChild('qrCanvas', { static: true }) qrCanvas!: ElementRef;

  // Cambia esta URL por la de tu APK en GitHub o la URL de tu app
  urlDescarga = 'https://github.com/TU_USUARIO/TU_REPO/releases';

  constructor(private router: Router) {}

  ngOnInit() {
    QRCode.toCanvas(this.qrCanvas.nativeElement, this.urlDescarga, {
      width: 200,
      margin: 2
    });
  }

  irARegistro() {
    this.router.navigate(['/login']);
  }
}