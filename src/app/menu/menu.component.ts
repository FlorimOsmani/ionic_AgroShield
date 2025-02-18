import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class MenuComponent {

  constructor(public auth: AuthService, private router: Router, private menuCtrl: MenuController) { }

  async logout() {
    try {
      // Logout from Auth0
      await this.auth.logout({ openUrl: false });
      // const returnToUrl = Capacitor.isNativePlatform() ? 'capacitor://localhost/home' : 'http://localhost:8100';
      // window.location.href = returnToUrl;
      localStorage.clear();

      // Optionally, you can clear local session or data if needed
      this.router.navigate(['/login']); // Redirect to login page after logout
      this.menuCtrl.close(); // Close the menu
    } catch (error) {
      console.error('Logout Error:', error);
      this.menuCtrl.close(); // Close the menu
    }
  }

  // Close menu on navigation
  closeMenuAndNavigate(route: string) {
    this.menuCtrl.close(); // Close the menu
    this.router.navigate([route]); // Navigate to selected route
  }
}