import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';
import { SchadeclaimService } from '../schadeclaim.service';
import { jwtDecode } from 'jwt-decode';
import { Schadeclaim } from '../schadeclaim';
import { PerceelService } from '../perceel.service';

@Component({
  selector: 'app-schadeclaims-raadplegen',
  templateUrl: './schadeclaims-raadplegen.component.html',
  styleUrls: ['./schadeclaims-raadplegen.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SchadeclaimsRaadplegenComponent implements OnInit {
  userEmail: string = '';
  error: string = '';
  isLoading: boolean = true;

  debug: string = '';

  schadeclaims: Schadeclaim[] = [];
  originalClaims: Schadeclaim[] = [];

  constructor(
    public auth: AuthService,
    private schadeclaimService: SchadeclaimService,
    private perceelService: PerceelService
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
        this.fetchSchadeclaims();
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
      this.schadeclaims = [];
      this.isLoading = true;
      this.fetchSchadeclaims();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async fetchSchadeclaims() {
    if (!this.userEmail) {
      console.warn('Geen ingelogde gebruiker gevonden.');
      return;
    }

    this.isLoading = true;

    (await this.perceelService.getPercelenByToegevoegdePersonenCAP(this.userEmail)).subscribe({
      next: (percelen) => {
        console.log('Opgehaalde percelen:', percelen);

        if (percelen.length === 0) {
          console.warn('Geen percelen gevonden voor deze gebruiker.');
          this.isLoading = false;
          return;
        }

        const schadeclaims: Schadeclaim[] = [];
        let remaining = percelen.length;
        percelen.forEach(async (perceel) => {
          (await this.schadeclaimService.getSchadeclaimByPerceelIdCAP(perceel.perceelDataId)).subscribe({
            next: (schadeclaim) => {
              if (Array.isArray(schadeclaim)) {
                schadeclaims.push(...schadeclaim);
                console.log('PerceelDataId: ', perceel.perceelDataId);
                console.log('Schadeclaim: ', schadeclaim);
              } else if (schadeclaim) {
                schadeclaims.push(schadeclaim);
                console.log('PerceelDataId: ', perceel.perceelDataId);
                console.log('Schadeclaim: ', schadeclaim);
              }
            },
            error: (err) => {
              console.error('Fout bij ophalen schadeclaim voor perceel:', perceel.perceelDataId, err);
            },
            complete: () => {
              remaining--;
              if (remaining === 0) {
                this.originalClaims = schadeclaims;
                this.schadeclaims = [...this.originalClaims];
                this.isLoading = false;
              }
            },
          });
        });
      },
      error: (err) => {
        console.error('Fout bij ophalen van percelen:', err);
        this.isLoading = false;
      },
    });
  }
}
