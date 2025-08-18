import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonButton, IonItem, IonToolbar, IonTitle, IonButtons, IonInput, IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
export class SignupComponent  implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  async register() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Preencha todos os campos', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('As senhas não conferem', 'danger');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      await updateProfile(userCredential.user, {
        displayName: this.name
      });

      this.showToast('Usuário cadastrado com sucesso!', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.showToast(error.message, 'danger');
    }
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
