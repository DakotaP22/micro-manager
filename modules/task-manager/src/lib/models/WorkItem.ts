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

export type WorkItemFromFirebase = {
    title: string;
    complexity: Complexity;
    priority: Priority;
    dueDate: Timestamp;
    tasks: Task[];

}

export type Complexity = 'Low' | 'Medium' | 'High';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';