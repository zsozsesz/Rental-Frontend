import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit() {
  }
  login() {
    this.auth.facebookLogin();
  }

  logout() {
    this.auth.facebookLogOut();
    this.router.navigate(['']);
  }
}
