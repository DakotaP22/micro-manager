import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@micromanager/auth';

@Component({
	selector: 'micro-manager-task-manager',
	standalone: true,
	imports: [CommonModule, MatSidenavModule, RouterModule, MatIconModule],
	templateUrl: './task-manager.component.html',
	styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent {
	authSvc = inject(AuthService);
	router = inject(Router);

	async onAccountClick() {
		await this.authSvc.logout();
		this.router.navigate(['/login']);
	}
}
