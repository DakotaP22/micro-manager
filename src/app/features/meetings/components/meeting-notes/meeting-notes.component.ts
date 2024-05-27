import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, afterNextRender, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
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

  meetingId = input<string>();

  notesForm = inject(FormBuilder).group({
    notes: [''],
  });

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
      debounceTime(500),
    ).subscribe({
      next: ({notes}) => {
        const id = this.meetingId();
        if(!!id) {
          this.meetingSvc.updateMeetingNotes(id, notes ?? '');
        }
      },
    });

  }


}
