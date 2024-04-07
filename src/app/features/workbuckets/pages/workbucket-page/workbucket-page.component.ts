import { Component, computed, effect, inject } from '@angular/core';
import { WorkbucketSelectComponent } from './components/workbucket-select/workbucket-select.component';
import { Router } from '@angular/router';
import { injectParams } from 'ngxtension/inject-params';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { WorkbucketService } from '../../services/workbucket.service';

@Component({
  selector: 'app-workbucket-page',
  standalone: true,
  imports: [WorkbucketSelectComponent],
  providers: [WorkbucketService],
  templateUrl: './workbucket-page.component.html',
  styleUrl: './workbucket-page.component.scss',
})
export class WorkbucketPageComponent {
  router = inject(Router);
  workbucketId = injectParams('id');
  workbucketSvc = inject(WorkbucketService);

  workbucketQuery = injectQuery(() => ({
    queryKey: ['workbuckets', '1', this.workbucketId()],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbucket(queryKey[2]),
    enabled: !!this.workbucketId(),
  }));
  workbucketsQuery = injectQuery(() => ({
    queryKey: ['workbuckets', '1'],
    queryFn: ({ queryKey }) => this.workbucketSvc.getWorkbuckets(queryKey[1]),
  }));

  name = computed(() => this.workbucketQuery.data()?.name ?? 'Loading...');
  workbuckets = computed(() => this.workbucketsQuery.data() ?? []);

  onBucketSelected(bucket_id: string) {
    this.router.navigate(['/workbucket', bucket_id]);
  }
}
