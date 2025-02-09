import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class MenuComponent {

  constructor(public auth: AuthService, private router: Router) { }

  async logout() {
    try {
      // Logout from Auth0
      await this.auth.logout({ openUrl: false });
      // const returnToUrl = Capacitor.isNativePlatform() ? 'capacitor://localhost/home' : 'http://localhost:8100';
      // window.location.href = returnToUrl;
      localStorage.clear();

      // Optionally, you can clear local session or data if needed
      this.router.navigate(['/login']); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }
}