import { Timestamp } from "@angular/fire/firestore";

export const WORK_ITEM_COMPLEXITIES = ['High', 'Medium', 'Low'] as const;
export type WorkItemComplexity = typeof WORK_ITEM_COMPLEXITIES[number];

export const WORK_ITEM_PRIORITIES = ['Critical', 'High', 'Medium', 'Low'] as const;
export type WorkItemPriority = typeof WORK_ITEM_PRIORITIES[number];

export const WORK_ITEM_STATUSES = ['Complete', 'Open', 'In Progress', 'Backlogged', 'Blocked'] as const;
export type WorkItemStatus = typeof WORK_ITEM_STATUSES[number];

export type WorkItemFirebaseDto = {
    name: string;
    complexity: WorkItemComplexity,
    priority: WorkItemPriority,
    hourEstimatedEffort: number;
    hoursActualEffort: number;
    dateDue: Timestamp,
    dateCompleted?: Timestamp,
    status: WorkItemStatus,
}

export type WorkItem = WorkItemFirebaseDto & { id: string };