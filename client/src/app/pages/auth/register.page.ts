import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { IonModule } from "src/app/shared/ion.module";

@Component({
  selector: "app-register-page",
  standalone: true,
  template: `
    <ion-content class="ion-padding">
      <div id="container">
        <form [formGroup]="registerForm">
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
          <ion-button type="submit" (click)="register()">ثبت نام</ion-button>
          <ion-button fill="clear" [routerLink]="['/page/auth/login']"
            >ورود</ion-button
          >
        </form>
      </div>
    </ion-content>
  `,
  styles: [
    `
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
export class RegisterPage implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      this.router.navigate(["/page/auth/login"]);
    });
  }
}
