import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

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

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.userEmail = user?.email!;
      if (!this.userEmail) {
        console.error('No user email found.');
        this.error = 'No user email found.';
        return;
      } else {
        console.log('User email found: ' + this.userEmail);
        this.error = 'User email found: ' + this.userEmail;
      }
    });
  }
}
