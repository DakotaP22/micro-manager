import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, RouterOutlet],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened [fixedInViewport]="true"> </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export class LayoutComponent {}
