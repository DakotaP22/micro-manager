export type Workbucket = {
    id: string,
    title: string,
    description?: string,
    items?: any[], // add workbucket items
    timeTarget?: number,
    timeTargetLabel?: string,
    openItems?: number
}