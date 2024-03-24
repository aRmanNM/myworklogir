import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  WorkLogCreateModel,
  WorkLogDetailModel,
  WorkLogStartModel,
  WorkLogUpdateModel,
} from "../contracts/worklog";

@Injectable({
  providedIn: "root",
})
export class WorkLogService {
  baseUrl = environment.apiBaseUrl + "/worklog";
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<WorkLogDetailModel[]> {
    return this.httpClient.get<WorkLogDetailModel[]>(this.baseUrl);
  }

  start(startModel: WorkLogStartModel): Observable<WorkLogDetailModel> {
    return this.httpClient.post<WorkLogDetailModel>(
      this.baseUrl + "/start",
      startModel
    );
  }

  create(createModel: WorkLogCreateModel): Observable<WorkLogDetailModel> {
    return this.httpClient.post<WorkLogDetailModel>(this.baseUrl, createModel);
  }

  update(updateModel: WorkLogUpdateModel): Observable<WorkLogDetailModel> {
    return this.httpClient.put<WorkLogDetailModel>(
      this.baseUrl + `/${updateModel.id}`,
      updateModel
    );
  }

  finish(id: number) {
    return this.httpClient.put(this.baseUrl + `/${id}/finish`, {});
  }

  delete(id: number) {
    return this.httpClient.delete(this.baseUrl + `/${id}`);
  }
}
