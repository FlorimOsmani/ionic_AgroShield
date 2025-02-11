import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IonicModule } from '@ionic/angular';
import { SchadeclaimService } from '../schadeclaim.service';
import { jwtDecode } from 'jwt-decode';
import { Schadeclaim } from '../schadeclaim';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-schadeclaims-beheren',
  templateUrl: './schadeclaims-beheren.component.html',
  styleUrls: ['./schadeclaims-beheren.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SchadeclaimsBeherenComponent implements OnInit {
  userEmail: string = '';
  error: string = '';
  isLoading: boolean = true;

  debug: string = '';

  schadeClaimsLijst = <Schadeclaim[]>([]);
  selectedImage: string | null = null;
  new: any;

  constructor(
    public auth: AuthService,
    private schadeclaimService: SchadeclaimService,
    private http: HttpClient
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
      this.schadeClaimsLijst = [];
      this.isLoading = true;
      this.fetchSchadeclaims();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  async fetchSchadeclaims() {
    this.isLoading = true;
    this.debug = "fetchSchadeclaims() called, loading schadeclaims...";

    await this.schadeclaimService.getSchadeclaimByEmail(this.userEmail).subscribe((schadeclaims) => {
      schadeclaims.forEach((claim) => {
        this.schadeClaimsLijst.push(claim);
      });
      this.schadeClaimsLijst = this.schadeClaimsLijst
      this.isLoading = false;
    })
  }

  async takePicture(claimId: string, perceelId: number) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        this.selectedImage = `data:image/jpeg;base64,${image.base64String}`;
        console.log("📸 Image Captured, proceeding to upload...");

        // Debugging logs
        console.log("✅ claimId:", claimId);
        console.log("✅ perceelId:", perceelId);

        // Ensure perceelId is correctly passed
        if (perceelId == null || perceelId === undefined) {
          console.error("❌ perceelId is undefined or null in takePicture!");
          return;
        }

        this.uploadImage(claimId, perceelId, image.base64String);
      }
    } catch (error) {
      console.error("❌ Error capturing image:", error);
    }
  }

  base64ToBlob(base64: string, contentType = 'image/jpeg') {
    try {
      // Remove Base64 header if it exists
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');

      // Convert Base64 to binary
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let i = 0; i < byteCharacters.length; i += 512) {
        const slice = byteCharacters.slice(i, i + 512);
        const byteNumbers = new Array(slice.length);
        for (let j = 0; j < slice.length; j++) {
          byteNumbers[j] = slice.charCodeAt(j);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      return new Blob(byteArrays, { type: contentType });
    } catch (error) {
      console.error('❌ Error decoding Base64:', error);
      throw error; // Prevents using an invalid Blob
    }
  }

  async uploadImage(schadeClaimId: string, perceelDataId: number, base64String: string) {
    const url = 'http://192.168.158.115:8000/fotos/create/';
    const formData = new FormData();

    formData.append('schadeClaimId', schadeClaimId);
    formData.append('perceelDataId', perceelDataId.toString());

    // Convert Base64 to Blob
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const imageBlob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/jpeg' });

    formData.append('file', imageBlob, perceelDataId + '_' + schadeClaimId + '_' + Date.now() + '.jpg');

    console.log('📤 Uploading...', formData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('✅ Upload successful:', result);
    } catch (error) {
      console.error('❌ Upload failed:', error);
    }
  }
}
