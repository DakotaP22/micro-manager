import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@micromanager/auth';

@Component({
	selector: 'micro-manager-layout',
	standalone: true,
	imports: [CommonModule, MatSidenavModule, MatIconModule, RouterModule],
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
	authSvc = inject(AuthService);
	router = inject(Router);

	async onAccountClick() {
		await this.authSvc.logout();
		this.router.navigate(['/login']);
	}
}
