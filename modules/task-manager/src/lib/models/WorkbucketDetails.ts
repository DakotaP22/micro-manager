import { WorkItem } from "./WorkItem";
import { Workbucket } from "./Workbucket";

export type WorkbucketDetails = Workbucket & {
    workItems: WorkItem[];
}