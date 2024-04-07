import { Component, input, output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Workbucket } from '../../../../models/Workbucket';

@Component({
  selector: 'workbucket-select',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './workbucket-select.component.html',
  styleUrl: './workbucket-select.component.scss'
})
export class WorkbucketSelectComponent {
  name = input.required<string>();
  availableBuckets = input<Workbucket[]>([]);

  bucketSelected = output<string>();

  onBucketClick(bucket_id: string) {
    this.bucketSelected.emit(bucket_id);
  }
}
