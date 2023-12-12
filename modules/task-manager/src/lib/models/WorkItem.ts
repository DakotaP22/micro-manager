import { Timestamp } from "@angular/fire/firestore";
import { Task } from "./Task";

export type WorkItem = {
    id: string;
    title: string;
    complexity: Complexity;
    priority: Priority;
    dueDate: number;
    tasks: Task[];
}

export type FirebaseWorkItem = {
    title: string;
    complexity: Complexity;
    priority: Priority;
    dueDate: Timestamp;
    externalTrackingId: string;
    tasks: Task[];
}

export type CreateFirebaseWorkItem = {
    title: string;
    priority: Priority;
    complexity: Complexity;
    dueDate: Timestamp;
    externalTrackingId: string;
    description?: string;
    notes?: string;
}

export type Complexity = 'Low' | 'Medium' | 'High';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';