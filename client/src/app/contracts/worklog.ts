export interface WorkLogDetailModel {
  id: number;
  title: string | null;
  description: string | null;
  workplaceId: number | null;
  workplaceName: string | null;
  startedAt: string;
  finishedAt: string | null;
  createdAt: string;
  lastEditedAt: string | null;
  duration: string;
  status: WorkLogStatus;
}

export interface WorkLogCreateModel {
  title: string;
  description: string | null;
  startedAt: string;
  finishedAt: string;
  workplaceId: number | null;
}

export interface WorkLogUpdateModel {
  id: number;
  title: string;
  description: string | null;
  startedAt: string;
  finishedAt: string;
  workplaceId: number | null;
}

export interface WorkLogStartModel {
  title: string;
}

export enum WorkLogStatus {
  Started,
  Finished,
}
