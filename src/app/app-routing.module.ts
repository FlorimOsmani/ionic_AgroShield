import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { PerceelRegistrerenPage } from './perceel-registreren/perceel-registreren.page';
// import { PercelenBeherenPage } from './percelen-beheren/percelen-beheren.page';
// import { PercelenRaadplegenPage } from './percelen-raadplegen/percelen-raadplegen.page';
// import { SchadeclaimOpstellenPage } from './schadeclaim-opstellen/schadeclaim-opstellen.page';
// import { SchadeclaimsBeherenPage } from './schadeclaims-beheren/schadeclaims-beheren.page';
// import { SchadeclaimRaadplegenPage } from './schadeclaim-raadplegen/schadeclaim-raadplegen.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'perceel-registreren', component: PerceelRegistrerenPage },
  // { path: 'percelen-beheren', component: PercelenBeherenPage },
  // { path: 'percelen-raadplegen', component: PercelenRaadplegenPage },
  // { path: 'schadeclaim-opstellen', component: SchadeclaimOpstellenPage },
  // { path: 'schadeclaims-beheren', component: SchadeclaimsBeherenPage },
  // { path: 'schadeclaim-raadplegen', component: SchadeclaimRaadplegenPage },
];