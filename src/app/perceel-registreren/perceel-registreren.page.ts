import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-perceel-registreren',
  templateUrl: './perceel-registreren.page.html',
  styleUrls: ['./perceel-registreren.page.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})

export class PerceelRegistrerenPage implements OnInit {
  userEmail: string = '';
  error: string = '';
  isLoading: boolean = true;

  constructor(public auth: AuthService) { }

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
