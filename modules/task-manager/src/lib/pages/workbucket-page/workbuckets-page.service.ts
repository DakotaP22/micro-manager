import { Injectable, inject } from '@angular/core';
import { AuthService } from '@micromanager/auth';
import { signalSlice } from 'ngxtension/signal-slice';
import {
	Observable,
	Subject,
	catchError,
	combineLatest,
	map,
	of,
	pipe,
	startWith,
	switchMap,
	tap
} from 'rxjs';
import { Workbucket } from '../../models/Workbucket';
import { WorkbucketsService } from '../../services/workbuckets.service';
import { ActivatedRoute } from '@angular/router';

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

type PartialWorkbucketsPageState = Partial<WorkbucketsPageState>;

@Injectable()
export class WorkbucketsPageService {
	private authSvc: AuthService = inject(AuthService);
	private workbucketSvc: WorkbucketsService = inject(WorkbucketsService);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	private getBuckets$ = new Subject<void>();

	buckets$ = combineLatest({
		authState: this.authSvc.auth$,
		fetch: this.getBuckets$.pipe(startWith(null)),
	}).pipe(
		map(({ authState }) => authState),
		map((authState) => authState.user?.id),
		switchMap<string | undefined, Observable<PartialWorkbucketsPageState>>(
			(userId: string | undefined) => {
				if (!userId) {
					return of({
						workbuckets: [],
						selectedWorkbucketId: null,
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
			}
		),
		catchError((err) => of({ workbuckets: [], loading: false, error: err }))
	);

	selectedBucketId$ = this.activatedRoute.paramMap.pipe(
		map((params) => params?.get('bucket-id') ?? null),
		map(id => ({ selectedWorkbucketId: id })),
		tap(id => (console.log(id)))
	);

	state = signalSlice({
		initialState,
		sources: [this.buckets$, this.selectedBucketId$],
		selectors: (state) => ({
			selectedWorkbucket: () => {
				const buckets = state().workbuckets;
				const selectedBucket = buckets.find(
					(bucket) => bucket.id === state().selectedWorkbucketId
				);
				return selectedBucket ?? buckets[0];
			},
			bucketCount: () => state().workbuckets.length,
		}),
		reducers: {
			getBuckets: (state) => {
				this.getBuckets$.next();
				return {
					workbuckets: [],
					loading: true,
					error: false
				}
			}
		},
		effects: (state) => ({
			logEffect: () => {
				console.log(state())
			}
		})
	});

}
