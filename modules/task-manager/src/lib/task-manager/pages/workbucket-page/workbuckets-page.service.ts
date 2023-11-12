import { Injectable, inject } from '@angular/core';
import { AuthService } from '@micromanager/auth';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
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

type PartialWorkbucketsPageState = Partial<WorkbucketsPageState>;

@Injectable()
export class WorkbucketsPageService {
	private authSvc: AuthService = inject(AuthService);
	private workbucketSvc: WorkbucketsService = inject(WorkbucketsService);

	buckets$ = this.authSvc.auth$.pipe(
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
						selectedWorkbucketId: workbuckets[0]?.id ?? null,
						loading: false,
						error: false,
					}))
				);
			}
		),
		catchError((err) => of({ workbuckets: [], loading: false, error: err }))
	);

	state = signalSlice({
		initialState,
		sources: [this.buckets$],
		selectors: (state) => ({
			selectedWorkbucket: () =>
				state().workbuckets.find(
					(bucket) => bucket.id === state().selectedWorkbucketId
				),
			bucketCount: () => state().workbuckets.length,
		}),
		reducers: {
			selectWorkbucket: (state, selectedWorkbucketId: string) => ({
				...state,
				selectedWorkbucketId,
			}),
		},
	});
}
