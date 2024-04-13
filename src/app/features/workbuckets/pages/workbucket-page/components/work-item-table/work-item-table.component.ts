import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WorkItem } from '../../../../models/WorkItem';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'work-item-table',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './work-item-table.component.html',
  styleUrl: './work-item-table.component.scss',
})
export class WorkItemTableComponent {
  workItems = input.required<WorkItem[]>();
  displayColumns = [
    'name',
    'complexity',
    'priority',
    'dueDate',
    'status',
  ];
}
