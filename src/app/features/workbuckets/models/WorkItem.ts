export class WorkItem {
  name: string;
  description: string;
  dueDate: Date;
  status: WorkItemStatus;
  priority: WorkItemPriority;
  complexity: WorkItemComplexity;

  constructor(
    name: string,
    description: string,
    dueDate: Date,
    status: string,
    priority: string,
    complexity: string
  ) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status as WorkItemStatus;
    this.priority = priority as WorkItemPriority;
    this.complexity = complexity as WorkItemComplexity;
  }
}

export type WorkItemStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Blocked'
  | 'Closed';
export const WorkItemStatusValueMap = {
  'Not Started': 0,
  'In Progress': 1,
  'Blocked': 2,
  'Closed': 3,
};

export type WorkItemPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export const WorkItemPriorityValueMap = {
  'Low': 0,
  'Medium': 1,
  'High': 2,
  'Critical': 3,
};

export type WorkItemComplexity = 'Low' | 'Medium' | 'High';
export const WorkItemComplexityValueMap = {
  'Low': 0,
  'Medium': 1,
  'High': 2,
};
