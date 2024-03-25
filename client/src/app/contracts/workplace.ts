export interface WorkplaceDetailModel {
  id: number;
  name: string | null;
}

export interface WorkplaceCreateModel {
  name: string;
}

export interface WorkplaceUpdateModel {
  id: number;
  name: string;
}
