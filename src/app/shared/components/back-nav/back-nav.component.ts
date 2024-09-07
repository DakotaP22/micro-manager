import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'back-nav',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './back-nav.component.html',
  styleUrl: './back-nav.component.scss'
})
export class BackNavComponent {
  route = input.required<string | string[]>();
  label = input<string>('Go Back');
}
