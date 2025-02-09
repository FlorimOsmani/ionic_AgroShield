import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios'; // Import axios for HTTP requests

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  auth0Client: any;
  loginError: string | null = null;
  email: string = '';
  password: string = '';

  constructor(private router: Router) {
    this.initializeAuth0();
  }

  async initializeAuth0() {
    try {
      this.auth0Client = await createAuth0Client({
        domain: environment.AUTH0_DOMAIN,
        clientId: environment.AUTH0_CLIENT_ID,
        authorizationParams: {
          redirect_uri: Capacitor.isNativePlatform() ? 'capacitor://localhost/home' : 'http://localhost:8100/home',
        },
      });
    } catch (error) {
      console.error('Error initializing Auth0:', error);
      this.loginError = 'Error initializing Auth0. Please try again later.';
    }
  }

  async login() {
    this.loginError = null;
    try {
      // Send request to Auth0 to authenticate with email and password
      const response = await axios.post(`https://${environment.AUTH0_DOMAIN}/oauth/token`, {
        grant_type: 'password',
        username: this.email,
        password: this.password,
        audience: environment.API_AUDIENCE, // Optional, include if using audience
        client_id: environment.AUTH0_CLIENT_ID,
        client_secret: environment.AUTH0_CLIENT_SECRET, // Optional, required for non-public clients
        scope: 'openid profile email',
        connection: 'Username-Password-Authentication',
      });

      // On success, store the tokens and redirect
      const { access_token, id_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('id_token', id_token);

      // Navigate to the home page
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login Error:', error);
      this.loginError = `Login failed. Error: ${(error as any).message || error}`;
    }
  }

  async logout() {
    try {
      await this.auth0Client.logout({
        returnTo: Capacitor.isNativePlatform() ? 'capacitor://localhost/home' : 'http://localhost:8100',
      });
    } catch (error) {
      console.error('Logout Error:', error);
      this.loginError = 'Logout failed. Please try again.';
    }
  }
}
