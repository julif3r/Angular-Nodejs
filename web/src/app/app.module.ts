import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UsersComponent } from './components/users/users/users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    SidebarComponent,
    UsersComponent,
    CreateUserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [ HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }
