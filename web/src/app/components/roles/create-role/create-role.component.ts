import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RoleCreate } from 'src/app/models/roleCreate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  private role: RoleCreate;
  public form: FormGroup;
  public alias: FormControl;
  public name: FormControl;

  constructor(private userService: UserService,
              private router: Router) {
   }

  ngOnInit() {
    this.alias = new FormControl('', Validators.required );
    this.name = new FormControl('', Validators.required );

    this.form = new FormGroup({
      alias: this.alias,
      name: this.name
    });
  }

  public async createRole() {
    this.role = {
      alias: this.alias.value,
      name: this.name.value,
    };
    if ( this.role ) {
      try {
        const result = await this.userService.createRole(this.role).toPromise();
        if ( result.data ) {
          this.router.navigate(['/roles']);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
