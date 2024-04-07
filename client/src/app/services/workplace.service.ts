import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  WorkplaceCreateModel,
  WorkplaceDetailModel,
  WorkplaceUpdateModel,
} from "../contracts/workplace";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkplaceService {
  baseUrl = environment.apiBaseUrl + "/workplace";

  private readonly _workplaceDetails = new BehaviorSubject<
    WorkplaceDetailModel[]
  >([]);
  readonly workplaceDetails$ = this._workplaceDetails.asObservable();

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<WorkplaceDetailModel[]>(this.baseUrl).subscribe((res) => {
      this._workplaceDetails.next(res);
    });
  }

  create(createModel: WorkplaceCreateModel) {
    this.http
      .post<WorkplaceDetailModel>(this.baseUrl, createModel)
      .subscribe(() => {
        this.getAll();
      });
  }

  update(updateModel: WorkplaceUpdateModel) {
    this.http
      .put<WorkplaceDetailModel>(
        this.baseUrl + `/${updateModel.id}`,
        updateModel
      )
      .subscribe(() => {
        this.getAll();
      });
  }

  delete(id: number) {
    this.http.delete(this.baseUrl + `/${id}`).subscribe(() => {
      this.getAll();
    });
  }
}
