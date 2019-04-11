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
    if ( this.form.valid ) {
      this.user = {
        email: 'admin@gmail.com',
        password: '123456'
      };
      const result = await this.authService.login(this.user);

      if ( result.data ) {
        this.router.navigate(['/users']);
      }
    }
  }

}
