import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'create', }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UsersRoutingModule { }
