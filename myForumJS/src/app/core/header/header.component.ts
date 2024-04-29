import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
