export type Workbucket = {
    id: string,
    title: string,
    archived: boolean,
    description?: string,
    openItems?: number,
    priority: number,
    allocation: number,
}