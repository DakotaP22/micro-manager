import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FollowUp } from '../../models/FollowUp';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'follow-up-items-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './follow-up-items-list.component.html',
  styleUrl: './follow-up-items-list.component.scss',
})
export class FollowUpItemsListComponent {
  addFollowUpInput = new FormControl('');

  followUpItems = input.required<FollowUp[]>();
  followUpAdded = output<string>();
  deleteFollowUpItem = output<string>();

  onSubmit(event: Event) {
    event.preventDefault();

    const value = this.addFollowUpInput.value;
    console.log('Adding follow up item:', value);
    if (!!value) {
      this.followUpAdded.emit(value);
    }

    this.addFollowUpInput.reset();
  }

  deleteFollowUp(id: string) {
    console.log('Deleting follow up item:', id);
    this.deleteFollowUpItem.emit(id);
  }

}
