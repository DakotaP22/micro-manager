import { Component, input, output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'workbucket-select',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './workbucket-select.component.html',
  styleUrl: './workbucket-select.component.scss'
})
export class WorkbucketSelectComponent {
  name = input.required<string>();
  availableBuckets = input<string[]>([]);

  bucketSelected = output<string>();

  onBucketClick(bucket: string) {
    this.bucketSelected.emit(bucket);
  }
}
