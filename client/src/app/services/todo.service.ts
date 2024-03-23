import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  TodoCreateModel,
  TodoDetailModel,
  TodoUpdateModel,
} from "../contracts/todo";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = environment.apiBaseUrl + "/todo";

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<TodoDetailModel[]> {
    return this.httpClient.get<TodoDetailModel[]>(this.baseUrl);
  }

  create(todoCreateModel: TodoCreateModel): Observable<TodoDetailModel> {
    return this.httpClient.post<TodoDetailModel>(
      this.baseUrl,
      todoCreateModel
    );
  }

  update(todoUpdateModel: TodoUpdateModel): Observable<void> {
    return this.httpClient.put<void>(
      this.baseUrl + `/${todoUpdateModel.id}`,
      todoUpdateModel
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + `/${id}`);
  }

  toggle(id: number): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl + `/${id}/toggle`, {});
  }
}
