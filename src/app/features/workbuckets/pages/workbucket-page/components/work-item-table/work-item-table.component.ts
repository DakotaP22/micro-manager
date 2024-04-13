import { DatePipe } from '@angular/common';
import { Component, effect, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WorkItem, WorkItemComplexityValueMap, WorkItemPriorityValueMap, WorkItemStatusValueMap } from '../../../../models/WorkItem';

@Component({
  selector: 'work-item-table',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatSortModule],
  templateUrl: './work-item-table.component.html',
  styleUrl: './work-item-table.component.scss',
})
export class WorkItemTableComponent {
  workItems = input.required<WorkItem[]>();
  displayColumns = ['name', 'complexity', 'priority', 'dueDate', 'status'];
  dataSource = new MatTableDataSource<WorkItem>([]);
  sort = viewChild(MatSort);

  constructor() {
    effect(() => {
      this.dataSource.data = this.workItems();
    });

    effect(() => {
      const s = this.sort();

      if (s) {
        this.dataSource.sort = s;
      }
    });

    this.dataSource.sortData = this.sortData();
  }

  // custom sort function
  sortData() {
    let sortFunction = (items: WorkItem[], sort: MatSort): WorkItem[] => {
      if (!sort.active || sort.direction === '') {
        return items;
      }
      return items.sort((a: WorkItem, b: WorkItem) => {
        let comparatorResult = 0;
        switch (sort.active) {
          case 'name':
            comparatorResult = a.name.localeCompare(b.name);
            break;
          case 'dueDate':
            comparatorResult = a.dueDate.getTime() - b.dueDate.getTime();
            break;
          case 'complexity':
            comparatorResult = WorkItemComplexityValueMap[a.complexity] - WorkItemComplexityValueMap[b.complexity];
            break
          case 'priority':
            comparatorResult = WorkItemPriorityValueMap[a.priority] - WorkItemPriorityValueMap[b.priority];
            break;
          case 'status':
            comparatorResult = WorkItemStatusValueMap[a.status] - WorkItemStatusValueMap[b.status];
            break;
        }
        return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
      });
    };
    return sortFunction;
  }
}
