import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  WorkLogCreateModel,
  WorkLogDetailModel,
  WorkLogStartModel,
  WorkLogStatus,
  WorkLogUpdateModel,
} from "../contracts/worklog";

@Injectable({
  providedIn: "root",
})
export class WorkLogService {
  baseUrl = environment.apiBaseUrl + "/worklog";

  private readonly _worklogItems = new BehaviorSubject<WorkLogDetailModel[]>(
    []
  );
  readonly worklogItems$ = this._worklogItems.asObservable();

  private readonly _startedWorklog = new BehaviorSubject<any>(null);
  readonly startedWorklog$ = this._startedWorklog.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getAll();
    this.checkWorking();
  }

  checkWorking() {
    const startedWorklog = this._worklogItems.value.find(
      (w) => w.status == WorkLogStatus.Started
    );

    if (startedWorklog != undefined) {
      this._startedWorklog.next(startedWorklog);
    }
  }

  getAll() {
    this.httpClient.get<WorkLogDetailModel[]>(this.baseUrl).subscribe((res) => {
      this._worklogItems.next(res);
      this.checkWorking();
    });
  }

  start(startModel: WorkLogStartModel) {
    this.httpClient
      .post<WorkLogDetailModel>(this.baseUrl + "/start", startModel)
      .subscribe(() => {
        this.getAll();
      });
  }

  create(createModel: WorkLogCreateModel) {
    this.httpClient
      .post<WorkLogDetailModel>(this.baseUrl, createModel)
      .subscribe(() => {
        this.getAll();
      });
  }

  update(updateModel: WorkLogUpdateModel) {
    this.httpClient
      .put<WorkLogDetailModel>(this.baseUrl + `/${updateModel.id}`, updateModel)
      .subscribe(() => {
        this.getAll();
      });
  }

  finish(id: number) {
    this.httpClient.put(this.baseUrl + `/${id}/finish`, {}).subscribe(() => {
      this.getAll();
    });
  }

  delete(id: number) {
    this.httpClient.delete(this.baseUrl + `/${id}`).subscribe(() => {
      this.getAll();
    });
  }

  deleteAll() {
    this.httpClient.delete(this.baseUrl + `/all`).subscribe(() => {
      this.getAll();
    });
  }
}
