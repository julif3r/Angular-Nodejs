import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public roles: Role[];

  constructor(private userService: UserService) { }

  ngOnInit() {

   this.getRoles();
  }

  public getRoles() {
    try {
      this.userService.getRoles().subscribe(result => {
        if ( result.data ) {
         this.roles = result.data;
         console.log(this.roles);
       }
     });
    } catch ( error ) {
      console.log(error);
    }
  }

  public async deleteRole(roleId: number) {
    try {
      const result = await this.userService.deleteRole(roleId);
      if ( result == null ) {
        setTimeout(() => {
          console.log('timeout');
          this.getRoles();
        }, 300);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
