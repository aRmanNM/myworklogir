import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-login-page",
  standalone: true,
  template: `
    <ion-content>
      <div id="container">
        <form [formGroup]="loginForm">
          <ion-input
            label="ایمیل"
            labelPlacement="stacked"
            type="email"
            placeholder="email@domain.com"
            formControlName="email"
          ></ion-input>
          <ion-input
            label="پسورد"
            labelPlacement="stacked"
            type="password"
            value="password"
            formControlName="password"
          ></ion-input>
          <ion-button type="submit" (click)="login()">ورود</ion-button>
          <ion-button fill="clear" [routerLink]="['/page/auth/register']"
            >ثبت نام</ion-button
          >
        </form>
      </div>
    </ion-content>
  `,
  styles: [
    `
      ion-content {
        width: 100%;
        heigh: 100%;
      }

      #container {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ],
  imports: [IonModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.loginForm.value);
    this.router.navigate(["/dashboard/todo"]); // TODO: replace this with returnUrl
  }
}
