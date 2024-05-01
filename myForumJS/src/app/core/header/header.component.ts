import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  elementAnimation,
  logoAnimation,
} from 'src/app/animations/postListAnimation';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [trigger('animateEl', elementAnimation()), logoAnimation()],
})
export class HeaderComponent implements OnInit {
  islogged = false;
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  // get isLoggedIn(): boolean {
  //   return this.userService.isLoggedIn;
  // }

  get firstName(): string {
    return this.userService.user?.username || '';
  }

  logout() {
    return this.userService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
    });
  }
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((user) => {
      this.islogged = !!user;
    });
  }
}
