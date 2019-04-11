import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserLogin } from 'src/app/models/userLogin.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserLogin;
  public form: FormGroup;
  public username: FormControl;
  public password: FormControl;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.username = new FormControl('', Validators.required );
    this.password = new FormControl('', Validators.required );

    this.form = new FormGroup({
      username: this.username,
      password: this.password
    });

  }

  public async login(event: any) {
    event.preventDefault();
    this.authService.login().subscribe(result => {
      console.log(result);
      this.router.navigate(['/users']);
    });
  }

  public async get(event: any) {
    event.preventDefault();
    this.authService.users().subscribe(result => {
      console.log(result);
    });
  }

}
