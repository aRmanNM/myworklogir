import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TodoCreateModel, TodoDetailModel } from "../contracts/todo";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<TodoDetailModel[]> {
    return this.httpClient.get<TodoDetailModel[]>(this.baseUrl + "/todo")
  }

  create(todoCreateModel: TodoCreateModel): Observable<TodoDetailModel> {
    return this.httpClient.post<TodoDetailModel>(this.baseUrl + "/todo", todoCreateModel);
  }
}
