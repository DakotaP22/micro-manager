import { Timestamp } from "@angular/fire/firestore";
import { Priority, Complexity } from "../../WorkItem";

export type CreateWorkItemDTO = {
    title: string;
    priority: Priority;
    complexity: Complexity;
    dueDate: Timestamp;
    externalTrackingId: string;
    description?: string;
    notes?: string;
}