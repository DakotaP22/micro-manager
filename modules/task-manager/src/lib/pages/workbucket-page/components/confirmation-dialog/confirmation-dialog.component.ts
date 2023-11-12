import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export type ConfirmationDialogData = {
	action: string;
	description: string;
	warn?: boolean;
}

@Component({
	selector: 'micro-manager-confirmation-dialog',
	standalone: true,
	imports: [CommonModule, MatDialogModule, MatButtonModule],
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
	data: ConfirmationDialogData = inject(MAT_DIALOG_DATA)
}
