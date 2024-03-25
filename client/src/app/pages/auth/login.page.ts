import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-login-page",
  standalone: true,
  template: `
    <form [formGroup]="loginForm">
      <ion-input
        label="ایمیل"
        type="email"
        placeholder="email@domain.com"
        formControlName="email"
      ></ion-input>
      <ion-input
        label="پسورد"
        type="password"
        value="password"
        formControlName="password"
      ></ion-input>
      <ion-button type="submit" (click)="login()">ورود</ion-button>
      <ion-button fill="clear">ثبت نام</ion-button>
    </form>
  `,
  styles: [``],
  imports: [IonModule, CommonModule, ReactiveFormsModule],
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
    this.router.navigate(["/page/todo"]);
  }
}
