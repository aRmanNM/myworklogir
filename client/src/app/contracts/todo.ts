export interface TodoDetailModel {
  id: number;
  title: string | null;
  description: string | null;
  workplaceId: number | null;
  workplaceName: string | null;
  isCompleted: boolean;
  completedAt: string | null;
  createdAt: string;
  lastEditedAt: string | null;
}

export interface TodoCreateModel {
  title: string;
  description: string | null;
  workplaceId: number | null;
}

export interface TodoUpdateModel {
  id: number;
  title: string;
  description: string | null;
  workplaceId: number | null;
}
