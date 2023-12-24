import { Timestamp } from "@angular/fire/firestore";
import { Complexity, Priority } from "../../WorkItem";

export type ReadWorkItemDTO = {
    title: string;
    complexity: Complexity;
    priority: Priority;
    dueDate: Timestamp;
    description?: string;
    externalTrackingId?: string;
    notes?: string;
}