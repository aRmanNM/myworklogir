import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  TodoCreateModel,
  TodoDetailModel,
  TodoUpdateModel,
} from "../contracts/todo";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = environment.apiBaseUrl + "/todo";

  private readonly _todoItems = new BehaviorSubject<TodoDetailModel[]>([]);
  readonly todoItems$ = this._todoItems.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.httpClient.get<TodoDetailModel[]>(this.baseUrl).subscribe((res) => {
      this._todoItems.next(res);
    });
  }

  create(todoCreateModel: TodoCreateModel) {
    this.httpClient
      .post<TodoDetailModel>(this.baseUrl, todoCreateModel)
      .subscribe(() => {
        this.getAll();
      });
  }

  update(todoUpdateModel: TodoUpdateModel) {
    this.httpClient
      .put<void>(this.baseUrl + `/${todoUpdateModel.id}`, todoUpdateModel)
      .subscribe(() => {
        this.getAll();
      });
  }

  delete(id: number) {
    this.httpClient.delete<void>(this.baseUrl + `/${id}`).subscribe(() => {
      this.getAll();
    });
  }

  deleteAll() {
    this.httpClient.delete<void>(this.baseUrl + `/all`).subscribe(() => {
      this.getAll();
    });
  }

  toggle(id: number) {
    this.httpClient
      .put<void>(this.baseUrl + `/${id}/toggle`, {})
      .subscribe(() => {
        this.getAll();
      });
  }
}
