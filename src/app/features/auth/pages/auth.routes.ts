import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const auth_routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
]
