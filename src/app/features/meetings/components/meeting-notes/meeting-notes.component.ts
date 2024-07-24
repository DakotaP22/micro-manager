import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, afterNextRender, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { debounceTime, filter, map, skip } from 'rxjs';
import { MeetingService } from '../../service/meeting.service';

@Component({
  selector: 'meeting-notes',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, TextFieldModule],
  templateUrl: './meeting-notes.component.html',
  styleUrl: './meeting-notes.component.scss',
})
export class MeetingNotesComponent {
  meetingSvc = inject(MeetingService);
  snackbarSvc = inject(MatSnackBar);

  meetingId = input.required<string | null>();

  notesForm = inject(FormBuilder).group({
    notes: [''],
  });

  updateNotesMutation = injectMutation(() => ({
    mutationFn: (notes: string) => {
      const meetingId = this.meetingId();
      if(!meetingId) {
        return Promise.resolve();
      }

      return this.meetingSvc.updateMeetingNotes(meetingId, notes);
    },
    onSuccess: () => {
      this.snackbarSvc.open('Updates saved', 'Dismiss', { duration: 2000 });
    },
    onError: () => {
      this.snackbarSvc.open('Failed to save updates', 'Dismiss', { duration: 2000 });
    }
  }))

  constructor() {

    afterNextRender(() => {
      const id = this.meetingId();
      if (!!id) {
        this.meetingSvc.getMeeting(id).then((meeting) => {
          if (!!meeting) {
            this.notesForm.patchValue({ notes: meeting.notes });
          }
        });
      }
    });

    this.notesForm.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(500), // save after specified amount of inactivity
      skip(1), // skip the intial value set during afterNextRender
    ).subscribe({
      next: ({notes}) => {
        console.log(notes)
        this.updateNotesMutation.mutate(notes ?? '');
      },
    });

  }


}
