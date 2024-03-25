import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  WorkplaceCreateModel,
  WorkplaceDetailModel,
  WorkplaceUpdateModel,
} from "../contracts/workplace";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkplaceService {
  baseUrl = environment.apiBaseUrl + "/workplace";
  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkplaceDetailModel[]> {
    return this.http.get<WorkplaceDetailModel[]>(this.baseUrl);
  }

  create(createModel: WorkplaceCreateModel): Observable<WorkplaceDetailModel> {
    return this.http.post<WorkplaceDetailModel>(this.baseUrl, createModel);
  }

  update(updateModel: WorkplaceUpdateModel): Observable<WorkplaceDetailModel> {
    return this.http.put<WorkplaceDetailModel>(
      this.baseUrl + `/${updateModel.id}`,
      updateModel
    );
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
