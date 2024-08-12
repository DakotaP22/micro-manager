import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiscussionItem } from '../../models/DiscussionItem';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'discussion-items-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './discussion-items-list.component.html',
  styleUrl: './discussion-items-list.component.scss'
})
export class DiscussionItemsListComponent {

  discussionItems = input.required<DiscussionItem[]>();

  discussionItemAdded = output<string>();
  itemDiscussed = output<string>();
  itemUndiscussed = output<string>();

  addDiscussionItemInput = new FormControl('');


  onSubmit(event: Event) {
    event.preventDefault();

    const value = this.addDiscussionItemInput.value;
    if(!!value) {
      this.discussionItemAdded.emit(value);
    }

    this.addDiscussionItemInput.reset();
  }

  updateDiscussionStatus(id: string, discussed: boolean) {
    const emitter = discussed ? this.itemDiscussed : this.itemUndiscussed;
    emitter.emit(id);
  }
}
