import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@micromanager/auth';
import { signalSlice } from 'ngxtension/signal-slice';
import {
	catchError,
	map,
	of,
	switchMap,
	tap
} from 'rxjs';
import { Workbucket } from '../../models/Workbucket';
import { WorkbucketsService } from '../../services/workbuckets.service';

export type WorkbucketsPageState = {
	workbuckets: Workbucket[];
	selectedWorkbucketId: string | null;
	loading: boolean;
	error: unknown;
};

const initialState: WorkbucketsPageState = {
	workbuckets: [],
	selectedWorkbucketId: null,
	loading: true,
	error: false,
};

@Injectable()
export class WorkbucketsPageService {
	private authSvc: AuthService = inject(AuthService);
	private workbucketSvc: WorkbucketsService = inject(WorkbucketsService);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	buckets$ = this.authSvc.auth$.pipe(
		map((authState) => authState.user?.id),
		switchMap((userId: string | undefined) => {
			if (!userId) {
				return of({
					workbuckets: [],
					loading: false,
					error: false,
				});
			}

			return this.workbucketSvc.getWorkbucketsForUser$(userId).pipe(
				map((workbuckets) => ({
					workbuckets: workbuckets ?? [],
					loading: false,
					error: false,
				}))
			);
		}),
		catchError((err) => of({ workbuckets: [], loading: false, error: err })),
	);

	private selectedBucketId$ = this.activatedRoute.paramMap.pipe(
		map((params) => params?.get('bucket-id') ?? null),
		map((id) => ({ selectedWorkbucketId: id })),
	);

	state = signalSlice({
		initialState,
		sources: [this.buckets$, this.selectedBucketId$],
		selectors: (state) => ({
			selectedWorkbucket: () =>
				state().workbuckets.find(
					(bucket) => bucket.id === state().selectedWorkbucketId
				),
			bucketCount: () => state().workbuckets.length,
		}),
	});
}
