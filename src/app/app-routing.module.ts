import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { CarsComponent } from './components/cars/cars.component';
import { AdminGuard } from './common/guards/admin.guard';
import { UserGuard } from './common/guards/user.guard';


const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent, canActivate: [UserGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'users', component: UsersComponent , canActivate: [AdminGuard]
  },
  {
    path: 'cars', component: CarsComponent , canActivate: [AdminGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
