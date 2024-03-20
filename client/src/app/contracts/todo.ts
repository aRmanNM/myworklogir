export interface TodoDetailModel {
    id: number;
    title: string | null;
    description: string | null;
    isCompleted: boolean;
    completedAt: string | null;
    createdAt: string;
    lastEditedAt: string | null;
}