import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.apiBaseUrl + "/connect";
  clientId = environment.clientId;
  clientSecret = environment.clientSecret;

  constructor(private httpClient: HttpClient) {}

  login(loginModel: any): void {
    const body = new URLSearchParams();
    body.set("username", loginModel.email);
    body.set("password", loginModel.password);
    body.set("grant_type", "password");
    body.set("scope", "todo worklog workplace");

    this.httpClient
      .post(this.baseUrl + "/token", body, {
        headers: new HttpHeaders()
          .set(
            "Authorization",
            "Basic " + btoa(`${this.clientId}:${this.clientSecret}`)
          )
          .set("Content-Type", "application/x-www-form-urlencoded"),
      })
      .subscribe((res: any) => {
        // console.log(res.access_token);
        localStorage.setItem("t", res.access_token);
      });
  }
}
