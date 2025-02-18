import { Component, input } from '@angular/core';
import { WorkItem } from '../../models/WorkItem';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'work-item-table',
  imports: [MatTableModule],
  template: `
    <table mat-table [dataSource]="workItems()">
      <ng-container matColumnDef="Task Name">
        <th mat-header-cell *matHeaderCellDef>Task Name</th>
        <td mat-cell *matCellDef="let workItem">{{ workItem.name }}</td>
      </ng-container>
      <ng-container matColumnDef="Complexity">
        <th mat-header-cell *matHeaderCellDef>Complexity</th>
        <td mat-cell *matCellDef="let workItem">{{ workItem.complexity }}</td>
      </ng-container>
      <ng-container matColumnDef="Priority">
        <th mat-header-cell *matHeaderCellDef>Priority</th>
        <td mat-cell *matCellDef="let workItem">{{ workItem.priority }}</td>
      </ng-container>
      <ng-container matColumnDef="Status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let workItem">{{ workItem.completed ? 'Complete' : 'Open' }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
    </table>
  `,
  styles: ``,
})
export class WorkItemTableComponent {
  displayColumns = ['Task Name', 'Complexity', 'Priority', 'Status'];

  workItems = input.required<WorkItem[]>();
}
