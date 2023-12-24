import { Injectable, Signal, inject } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { WorkItemsService } from '../data/work-items.service';
import { CreateWorkItemDTO } from '../models/dto/WorkItem/CreateWorkItemDTO';

@Injectable()
export class WorkItemsQueryService {
	workItemsSvc = inject(WorkItemsService);

	getWorkItemsQuery(bucketId: Signal<string | null>) {
		return injectQuery(() => ({
			enabled: !!bucketId(),
			queryKey: ['workItems', bucketId()] as const,
			queryFn: () => this.workItemsSvc.getWorkItemsForBucket(bucketId()),
			initialData: [],
		}));
	}

	getWorkItemQuery(workBucketId: Signal<string | null>, workItemId: Signal<string | null>) {
		return injectQuery(() => ({
			enabled: !!workBucketId() && !!workItemId(),
			queryKey: ['workItems', workBucketId(), workItemId()] as const,
			queryFn: () => this.workItemsSvc.getWorkItemForBucket(workBucketId(), workItemId()),
			initialData: null,
		}));
	}

	addWorkItem = injectMutation((client) => ({
		mutationKey: ['addWorkItem'] as const,
		mutationFn: ({ workbucketId, workItem }: { workbucketId: string; workItem: CreateWorkItemDTO }) =>
			this.workItemsSvc.createWorkItemForBucket(workbucketId, workItem),
		onSuccess: () => client.invalidateQueries({ queryKey: ['workItems'] }),
	}));

	deleteWorkItem = injectMutation((client) => ({
		mutationKey: ['deleteWorkItem'] as const,
		mutationFn: ({ workbucketId, workItemId }: { workbucketId: string; workItemId: string }) =>
			this.workItemsSvc.deleteWorkItemFromBucket(workbucketId, workItemId),
		onSuccess: () => client.invalidateQueries({ queryKey: ['workItems'] }),
	}));
}
