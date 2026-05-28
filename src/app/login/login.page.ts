import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem,IonLabel,IonInput,IonButton,IonText,IonCard,IonCardContent } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem,IonLabel,IonInput,IonButton,IonText,IonCard,IonCardContent, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  email='';
  password='';
  mensaje='';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  async login() {
    try {
      await this.firebaseService.login(this.email, this.password);
      this.router.navigate(['/tabs/tab1']);
    } catch (error: any) {
      this.mensaje = this.traducirError(error.code);
    }
  }

  async register() {
    try {
      await this.firebaseService.register(this.email, this.password);
      this.mensaje = 'Usuario registrado';
    } catch (error: any) {
      this.mensaje = this.traducirError(error.code);
    }
  }
    // Mensajes de error en español
  traducirError(code: string): string {
    const errores: Record<string, string> = {
      'auth/invalid-email': 'Correo inválido',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'El correo ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-credential': 'Credenciales incorrectas',
    };
    return errores[code] ?? 'Error desconocido: ' + code;
  }

  ngOnInit() {
  }

}
