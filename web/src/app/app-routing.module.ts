import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { UsersComponent } from './components/users/users/users.component';

const routes: Routes = [
  {
    path: 'login', component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  { path: '', component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: UsersComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
