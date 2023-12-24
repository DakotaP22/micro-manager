import { Injectable, Signal, inject } from '@angular/core';
import { WorkItemCommentsService } from '../data/work-item-comments.service';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

@Injectable( )
export class WorkItemCommentsQueryService {
    workItemCommentsSvc = inject(WorkItemCommentsService);

    getWorkItemCommentsQuery(bucketId: Signal<string | null>, workItemId: Signal<string | null>) {
        return injectQuery(() => ({
            enabled: !!bucketId() && !!workItemId(),
            queryKey: ['workItemComments', bucketId(), workItemId()] as const,
            queryFn: () => this.workItemCommentsSvc.getComments(bucketId(), workItemId()),
        }));
    }
    
    addComment = injectMutation((client) => ({
        mutationKey: ['addComment'] as const,
        mutationFn: ({ workbucketId, workItemId, comment }: {workbucketId: string | null, workItemId: string | null, comment: string} ) =>
            this.workItemCommentsSvc.createComment(workbucketId, workItemId, comment),
        onSuccess: () => client.invalidateQueries({ queryKey: ['workItemComments' ] }),
    }));
}