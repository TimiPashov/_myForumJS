import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  constructor(private userService: UserService) { }
  authenticating = true;

  ngOnInit(): void {
    this.userService.getProfile()
      .subscribe({
        next: () => {
          this.authenticating = false;
        },
        error: () => {
          this.authenticating = false;
        },
        complete: () => {
          this.authenticating = false;
        }
      })
  }
}
