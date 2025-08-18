import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

import { IonButton, IonItem, IonToolbar, IonTitle, IonButtons, IonInput, IonContent, IonIcon } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    IonButton,
    IonItem,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput,
    IonContent,
    IonIcon
  ]
})
export class LoginComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: Auth,
    private toastController: ToastController
  ) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        const unsubscribe = onAuthStateChanged(this.auth, (user) => {
          console.log('user', user)
          if (user) {
            this.router.navigate(['/home']);
            unsubscribe();
          }
        });
      })
      .catch(error => {
        this.showToast('E-mail ou senha inválidos', 'danger');
      });
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
