import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '@auth0/auth0-angular';
import { PerceelService } from '../perceel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-percelen-beheren',
  templateUrl: './percelen-beheren.component.html',
  styleUrls: ['./percelen-beheren.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PercelenBeherenComponent implements OnInit {
  userEmail: string = '';
  error: string = '';
  isLoading: boolean = true;

  debug: string = '';

  percelenLijst: any[] = [];

  constructor(
    public auth: AuthService,
    private perceelService: PerceelService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    // Get the tokens from localStorage
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');


    if (idToken) {
      try {
        // Decode the ID token to extract the user email
        const decodedToken: any = jwtDecode(idToken);
        this.userEmail = decodedToken.email;
        this.fetchPercelen();
        this.debug = `called fetchPercelen() with email: ${this.userEmail}`;
      } catch (error) {
        this.error = 'Error decoding ID token';
        this.isLoading = false;
        console.error('Error decoding ID token:', error);
      }
    }

    // Optionally check if the tokens are available and handle the loading state
    if (!accessToken || !idToken) {
      this.isLoading = false;
      this.error = 'Tokens are not available';
      console.log('Tokens are not available');
    }
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      this.percelenLijst = [];
      this.isLoading = true;
      this.fetchPercelen();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  // Fetch percelen from the server
  async fetchPercelen() {
    this.isLoading = true;
    this.debug = "fetchPercelen() called, loading percelen...";

    (await this.perceelService.getPercelenByEmailCAP(this.userEmail)).subscribe({
      next: (percelen) => {
        this.debug = `Received percelen: ${JSON.stringify(percelen)}`;
        setTimeout(() => {
          this.percelenLijst = percelen;
          this.isLoading = false;
        }, 2000);
      },
      error: (err) => {
        this.debug = `Error fetching percelen: ${JSON.stringify(err)}`;
        console.error('Error fetching percelen:', err);
        this.isLoading = false;
      }
    });
  }

}
