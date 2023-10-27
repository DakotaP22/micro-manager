import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  standalone: true,
  imports: [RouterModule, MatSidenavModule],
  selector: 'micro-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
