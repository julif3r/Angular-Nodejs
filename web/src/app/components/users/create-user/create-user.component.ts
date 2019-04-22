import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public user: User;
  public roles: Role[];
  public form: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.firstName = new FormControl('', Validators.required );
    this.lastName = new FormControl('', Validators.required );
    this.email = new FormControl('', [ Validators.email, Validators.required ] );

    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    });

    this.userService.getRoles().subscribe(result => {
      if ( result.data ) {
        console.log(result.data);
        this.roles = result.data;
      }
    });
  }

  public async createUser(event: Event) {
    this.user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value
    };

    if ( this.user ) {
      try {
        const result = await this.userService.createUser(this.user).toPromise();

        if ( result.data ) {
          this.router.navigate(['users']);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
