import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private message = '';

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose( [Validators.email, Validators.required , Validators.maxLength(99)])],
      password: ['', Validators.compose( [Validators.required , Validators.maxLength(50)])]
    });
  }

  ngOnInit() {
  }
  login() {
    this.authService.adminLogin(this.loginForm.value).subscribe(
      res => {
        if (res) {
          this.router.navigate(['cars']);
        } else {
          this.message = 'Auth error!!!!';
        }

    });
}
}
