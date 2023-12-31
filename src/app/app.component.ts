import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@micromanager/auth';
import { HomeComponent } from '@micromanager/landing';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';


@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent, AngularQueryDevtools],
  selector: 'micro-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  authSvc = inject(AuthService);
}
