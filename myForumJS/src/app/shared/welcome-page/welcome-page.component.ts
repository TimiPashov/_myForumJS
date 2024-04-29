import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  isLogged = false;

  constructor(private userService: UserService) {}

  
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((user) => {
      this.isLogged = !!user;
    });
  }
}
