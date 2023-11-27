import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { WorkbucketsService } from '../data/workbuckets.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class WorkbucketQueryService {
	private queryClient = injectQueryClient();
	private query = injectQuery();
	private mutation = injectMutation();
	private bucketSvc = inject(WorkbucketsService);
	private router = inject(Router);

	// Queries
	getBuckets() {
		return this.query({
			queryKey: ['buckets'] as const,
			queryFn: () => this.bucketSvc.buckets$,
		});
	}

	getBucket(id: string) {
		return this.query({
			queryKey: ['bucket', id] as const,
			queryFn: () => EMPTY,
		});
	}

	// Mutations
	addBucket() {
		return this.mutation({
			mutationFn: ({
				title,
				description,
			}: {
				title: string;
				description: string;
			}) => this.bucketSvc.addBucket(title, description),
			onSuccess: () =>
				this.queryClient.invalidateQueries({ queryKey: ['buckets'] }),
		});
	}

	archiveBucket() {
		return this.mutation({
			mutationFn: ({bucketId}: {bucketId: string}) => this.bucketSvc.archiveBucket(bucketId),
			onSuccess: (_, bucketId) => {
				this.queryClient.invalidateQueries({ queryKey: ['buckets'] });
				this.queryClient.invalidateQueries({
					queryKey: ['bucket', bucketId],
				});
			},
		});
	}

	deleteBucket() {
		return this.mutation({
			mutationFn: ({bucketId}: {bucketId: string}) => this.bucketSvc.deleteBucket(bucketId),
			onSuccess: (_, bucketId) => {
				this.queryClient.invalidateQueries({ queryKey: ['buckets'] });
			 	this.queryClient.invalidateQueries({
					queryKey: ['bucket', bucketId],
				});
			},
		});
	}
}
