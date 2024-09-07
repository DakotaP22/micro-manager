import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, afterNextRender, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { debounceTime, distinctUntilChanged, filter, map, skip } from 'rxjs';
import { MeetingService } from '../../services/meeting.service';


@Component({
  selector: 'meeting-notes',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, TextFieldModule],
  templateUrl: './meeting-notes.component.html',
  styleUrl: './meeting-notes.component.scss',
})
export class MeetingNotesComponent {
  notes = input.required<string>();
  notesUpdated = output<string>();

  notesInput = new FormControl('');

  constructor() {
    effect(() => {
      const notes = this.notes();
      this.notesInput.setValue(notes);
    });

    this.notesInput.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(500), // save after specified amount of inactivity
      skip(1), // skip the intial value set during effect
      distinctUntilChanged(), // prevent double save when resycning form with server
    ).subscribe({
      next: (notes) =>
        this.notesUpdated.emit(notes ?? '')
    });
  }
}
