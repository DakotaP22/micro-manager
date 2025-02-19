import { Timestamp } from "@angular/fire/firestore";

export type WorkItem = WorkItemFirebaseDto & { id: string };

export type WorkItemFirebaseDto = {
    name: string;
    complexity: 'High' | 'Medium' | 'Low',
    priority: 'Critical' | 'High' | 'Medium' | 'Low',
    dueDate: Timestamp,
    status: 'Complete' | 'Open' | 'In Progress' | 'Backlogged' | 'Blocked',
}