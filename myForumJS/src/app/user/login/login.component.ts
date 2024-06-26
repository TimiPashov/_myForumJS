import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  isLoading: boolean = false;
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
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const { email, password } = form.value;
    this.isLoading = true;
    this.userService.login(email, password).subscribe(
      () => {
        this.router.navigate(['/themes']);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
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
