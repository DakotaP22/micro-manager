import { Component, input, output } from '@angular/core';
import { WorkItem } from '../../models/WorkItem';
import { MatTableModule } from '@angular/material/table';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'work-item-table',
  imports: [MatTableModule, MatButtonModule, DatePipe],
  template: `
    <button mat-stroked-button (click)="newWorkItemTrigger.emit()">New Work Item</button>
    <table mat-table [dataSource]="workItems()">
      <ng-container matColumnDef="Work Item Name">
        <th mat-header-cell *matHeaderCellDef>Work&nbsp;Item&nbsp;Name</th>
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
      <ng-container matColumnDef="Due Date">
        <th mat-header-cell *matHeaderCellDef>Due&nbsp;Date</th>
        <td mat-cell *matCellDef="let workItem">{{ workItem.dueDate.toDate() | date:'shortDate' }}</td>
      </ng-container>
      <ng-container matColumnDef="Status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let workItem">{{ workItem.status }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
    </table>
  `,
  styles: ``,
})
export class WorkItemTableComponent {
  displayColumns = ['Work Item Name', 'Complexity', 'Priority', 'Due Date', 'Status'];
  
  workItems = input.required<WorkItem[]>();
  newWorkItemTrigger = output<void>();
}
