// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { AuthModule } from '@auth0/auth0-angular';
// import { environment } from 'src/environments/environment';

// @NgModule({
//   declarations: [],
//   imports: [BrowserModule, IonicModule.forRoot(), AppComponent, AppRoutingModule, AuthModule.forRoot({
//     domain: environment.AUTH0_DOMAIN,
//     clientId: environment.AUTH0_CLIENT_ID,
//     authorizationParams: {
//       redirect_uri: environment.redirectUri,
//       audience: environment.API_AUDIENCE,
//       scope: "openid profile email"
//     }
//   })],
//   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
//   bootstrap: [AppComponent],
// })
// export class AppModule { }
