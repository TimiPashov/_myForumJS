import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AuthUser } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userService: UserService) { }

  get user(): AuthUser | undefined {
    return this.userService.user || undefined;
  } 

}
