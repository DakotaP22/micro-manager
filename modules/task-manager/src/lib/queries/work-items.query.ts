import { Injectable, Signal, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { WorkItemsService } from '../data/work-items.service';

@Injectable()
export class WorkItemsQueryService {
    workItemsSvc = inject(WorkItemsService);
    
    
    getWorkItemsQuery(bucketId: Signal<string | null>) {
        return injectQuery(() => ({
            enabled: !!bucketId(),
            queryKey: ['workItems', bucketId()] as const,
            queryFn: () => this.workItemsSvc.getWorkItemsForBucket(bucketId()),
        }));
    }

}