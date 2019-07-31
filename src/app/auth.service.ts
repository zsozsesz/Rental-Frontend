import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from './common/dtos/login.dto';
import { map, catchError} from 'rxjs/operators';
import { AuthService as Facebookauth } from 'angularx-social-login';
import { FacebookLoginProvider} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $role: BehaviorSubject<string> = new BehaviorSubject(null);
  $login: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: SocialUser;
  admin = false;

  constructor(private http: HttpClient, private facebook: Facebookauth, private readonly router: Router) {
    this.facebook.authState.subscribe((user) => {
      this.user = user;
      this.$login.next(user != null);
      this.$role.next('USER');
      router.navigate(['profile']);
      if (user) {
      //  router.navigate(['/profile']);
      }
    });
  }

  adminLogin(loginDto: LoginDto): Observable<boolean> {
      return this.http.post<any>('/auth/adminLogin', loginDto).pipe(map(
        response => {
          this.$role.next(response.user.role);
          this.$login.next(true);
          this.$role.next('ADMIN');
          localStorage.setItem('access_token', response.access_token);
          return true;
        }),
        catchError((err: any) => {
          return of(false);
        } )
        );
  }

  facebookLogin() {
      this.facebook.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  facebookLogOut(): void {

    this.facebook.signOut();
    this.$login.next(false);
    this.$role.next(null);
  }
}
