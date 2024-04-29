import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged:boolean = false;
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  login(form: NgForm) {
    if (!form) {
      return;
    }

    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(
      () => {
        this.router.navigate(['/themes']);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      },
    );
  }
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((user) => {
      this.isLogged = !!user;
      if (this.isLogged) {
        this.router.navigate(['/themes']);
      }
    });
  }
}
