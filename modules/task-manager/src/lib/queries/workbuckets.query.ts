import { Injectable, inject } from '@angular/core';
import { WorkbucketsService } from '../data/workbuckets.service';
import { Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

@Injectable()
export class WorkbucketQueryService {
	private bucketSvc = inject(WorkbucketsService);

	// Queries
	bucketsQuery = injectQuery(() => ({
		queryKey: ['buckets'] as const,
		queryFn: () => this.bucketSvc.getWorkbucketsForSignedInUser(),
	}));

	addBucket = injectMutation((client) => ({
		mutationKey: ['addBucket'] as const,
		mutationFn: ({title, description}: {title: string, description: string}) => this.bucketSvc.addBucket(title, description),
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
	
}
