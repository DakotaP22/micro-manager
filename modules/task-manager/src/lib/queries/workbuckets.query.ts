import { Injectable, Signal, inject } from '@angular/core';
import {
	injectMutation,
	injectQuery,
} from '@tanstack/angular-query-experimental';
import { WorkbucketsService } from '../data/workbuckets.service';

@Injectable()
export class WorkbucketQueryService {
	private bucketSvc = inject(WorkbucketsService);

	// Queries
	getBucketsQuery() {
		return injectQuery(() => ({
			queryKey: ['buckets'] as const,
			queryFn: () => this.bucketSvc.getWorkbucketsForSignedInUser(),
		}));
	}

	getBucketDetailsQuery(bucketId: Signal<string | null>) {
		return injectQuery(() => ({
			enabled: !!bucketId(),
			queryKey: ['buckets', bucketId()] as const,
			queryFn: () =>
				this.bucketSvc.getWorkbucketDetailsForSignedInUser(bucketId() ?? ''),
		}));
	}

	// Mutations
	addBucket = injectMutation((client) => ({
		mutationKey: ['addBucket'] as const,
		mutationFn: ({
			title,
			description,
			priority,
			allocation,
		}: {
			title: string;
			description?: string | null;
			priority?: number | null;
			allocation?: number | null;
		}) => this.bucketSvc.addBucket(title, description, priority, allocation),
		onSuccess: () => client.invalidateQueries({ queryKey: ['buckets'] }),
	}));

	archiveBucket = injectMutation((client) => ({
		mutationKey: ['archiveBucket'] as const,
		mutationFn: (bucketId: string) => this.bucketSvc.archiveBucket(bucketId),
		onSuccess: () => client.invalidateQueries({ queryKey: ['buckets'] }),
	}));

	deleteBucket = injectMutation((client) => ({
		mutationKey: ['deleteBucket'] as const,
		mutationFn: (bucketId: string) => this.bucketSvc.deleteBucket(bucketId),
		onSuccess: () => client.invalidateQueries({ queryKey: ['buckets'] }),
	}));

	updateBucket = injectMutation((client) => ({
		mutationKey: ['updateBucket'] as const,
		mutationFn: ({
			bucketId,
			title,
			description,
			priority,
			allocation,
		}: {
			bucketId: string;
			title: string;
			description?: string | null;
			priority?: number | null;
			allocation?: number | null;
		}) =>
			this.bucketSvc.updateBucket(
				bucketId,
				title,
				description,
				priority,
				allocation
			),
		onSuccess: () => client.invalidateQueries({ queryKey: ['buckets'] }),
	}));
}
