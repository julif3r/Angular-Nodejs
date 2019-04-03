import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  public async login(event: any) {
    event.preventDefault();
    this.authService.login().subscribe(result=>{
      console.log(result);
    });
  }

  public async get(event: any) {
    event.preventDefault();
    this.authService.users().subscribe(result => {
      console.log(result);
    });
  }

}
