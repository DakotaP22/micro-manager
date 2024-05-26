import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'meeting-notes',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, TextFieldModule],
  templateUrl: './meeting-notes.component.html',
  styleUrl: './meeting-notes.component.scss',
})
export class MeetingNotesComponent {}
