import { Injectable, inject } from '@angular/core';
import {MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ErrorNotificationService {
    private snackbar = inject(MatSnackBar);

    dismissed$ = this.snackbar._openedSnackBarRef?.afterDismissed();
    action$ = this.snackbar._openedSnackBarRef?.onAction();
    
    notifyUser(message: string, duration = 5000) {
        this.snackbar.open(message, 'Dismiss', {
            duration
        });
    }
}