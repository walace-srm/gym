import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton
  ]
})
export class HomeComponent implements OnInit {

  authService = inject(AuthService);

  displayName = this.authService.displayName;

  user = {
    name: 'Walace Maia',
    level: 'Nível Roxo',
    avatar: 'assets/img/avatar.jpg',
  };

  personalOnline = [
    { id: 'novo', title: 'NOVO\nTREINO', image: 'assets/img/barbell.png', isCreate: true },
    { id: 'yoga', title: 'YOGA EXPRESS', image: 'assets/img/yoga.png' },
  ];

  programas = [
    {
      id: 'peso',
      title: 'LEVANTAMENTO DE PESO',
      badge: 'continuar treinando',
      image: 'assets/img/peso.png',
      progress: 45,
    },
    { id: 'yoga2', title: 'YOGA EXPRESS', image: 'assets/img/yoga.png', progress: 0 },
  ];

  conteudos = Array.from({ length: 6 }).map((_, i) => ({ id: i + 1 }));

  trackById = (_: number, item: any) => item.id;

  ngOnInit(): void {
    console.log('NOME', this.displayName)
  }

}
