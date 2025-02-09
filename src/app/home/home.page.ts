import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  userEmail: string = '';
  isLoading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    // Get the tokens from localStorage
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      try {
        // Decode the ID token to extract the user email
        const decodedToken: any = jwtDecode(idToken);
        this.userEmail = decodedToken.email;
      } catch (error) {
        console.error('Error decoding ID token:', error);
      }
    }

    // Optionally check if the tokens are available and handle the loading state
    if (!accessToken || !idToken) {
      this.isLoading = false;
      console.log('Tokens are not available');
    }
  }
}
