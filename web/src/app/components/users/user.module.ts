import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsersComponent,
    CreateUserComponent
  ]
})
export class UserModule { }
