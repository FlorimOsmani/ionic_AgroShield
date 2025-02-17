import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { PercelenBeherenComponent } from './percelen-beheren/percelen-beheren.component';
import { PercelenRaadplegenComponent } from './percelen-raadplegen/percelen-raadplegen.component';
import { SchadeclaimsBeherenComponent } from './schadeclaims-beheren/schadeclaims-beheren.component';
import { SchadeclaimsRaadplegenComponent } from './schadeclaims-raadplegen/schadeclaims-raadplegen.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'percelen-beheren', component: PercelenBeherenComponent },
  { path: 'percelen-raadplegen', component: PercelenRaadplegenComponent },
  { path: 'schadeclaims-beheren', component: SchadeclaimsBeherenComponent },
  { path: 'schadeclaim-raadplegen', component: SchadeclaimsRaadplegenComponent },
];