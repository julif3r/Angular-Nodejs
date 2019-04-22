import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
     this.getUsers();
  }

  public getUsers() {
    try {
      this.userService.getUsers().subscribe(result => {
        if ( result.data ) {
         this.users = result.data;
       }
     });
    } catch ( error ) {
      console.log(error);
    }
  }

  public async deleteUser(userId: number) {
    try {
      const result = await this.userService.deleteUser(userId);
      if ( result == null ) {
        setTimeout(() => {
          this.getUsers();
        }, 300);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public editUser(user: User) {
    console.log(user);
  }

}
