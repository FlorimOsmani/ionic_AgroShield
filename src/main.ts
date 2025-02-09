import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: environment.redirectUri,
        audience: environment.API_AUDIENCE,
        scope: 'openid profile email',
      },
    }),
    importProvidersFrom(IonicModule.forRoot({})),
  ],
}).catch((err) => console.error(err));