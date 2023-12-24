
export type WorkItem = {
    id: string;
    title: string;
    complexity: Complexity;
    priority: Priority;
    dueDate: number;
    externalTrackingId?: string;
    description?: string;
}

export type Complexity = 'Low' | 'Medium' | 'High';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';