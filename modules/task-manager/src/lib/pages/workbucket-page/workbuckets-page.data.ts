import { Injectable, inject } from '@angular/core';
import { Workbucket } from '../../models/Workbucket';
import { WorkbucketsService } from '../../data/workbuckets.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, combineLatest, map, of, startWith, tap } from 'rxjs';
import { signalSlice } from 'ngxtension/signal-slice';

export type WorkbucketPageDataStoreState = {
	workbuckets: Workbucket[];
	selectedWorkbucketId: string | null;
	loading: boolean;
	error?: unknown;
};

const initialState: WorkbucketPageDataStoreState = {
	workbuckets: [],
	selectedWorkbucketId: null,
	loading: true,
};

@Injectable()
export class WorkbucketsPageDataStore {
	private workbucketSvc = inject(WorkbucketsService);
	private activatedRoute = inject(ActivatedRoute);

	private refetch$ = new Subject<void>().pipe(map(() => ({ loading: true })));

	private buckets$ = combineLatest({
		workbuckets: this.workbucketSvc.buckets$.pipe(tap(data => console.log(data))),
		refetch: this.refetch$.pipe(startWith(null)),
    }).pipe(
        tap(data => console.log(data)),
        map(({workbuckets}) => ({
            workbuckets,
            loading: false,
        })),
        catchError((err) => {
            console.log(err);
            return of({ workbuckets: [], loading: false, error: err })
        })
    );

	private selectedBucketId$ = this.activatedRoute.paramMap.pipe(
		map((params) => params?.get('bucket-id') ?? null),
		map((id) => ({ selectedWorkbucketId: id }))
	);

	state = signalSlice({
		initialState,
		sources: [this.buckets$, this.selectedBucketId$],
		selectors: (state) => ({
			bucketCount: () => state().workbuckets?.length ?? 0,
			selectedBucket: () => {
				const selectedId = state().selectedWorkbucketId;
				return state().workbuckets?.find((bucket) => bucket.id === selectedId);
			},
        }),
        effects: (state) => ({
            logState: () => (console.log(state()))
        })
	});
}
