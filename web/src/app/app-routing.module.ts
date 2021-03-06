import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { UsersComponent } from './components/users/users/users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { RolesComponent } from './components/roles/roles/roles.component';
import { CreateRoleComponent } from './components/roles/create-role/create-role.component';

const routes: Routes = [
  {
    path: 'login', component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  { path: '', component: HomeLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'create-role', component: CreateRoleComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
