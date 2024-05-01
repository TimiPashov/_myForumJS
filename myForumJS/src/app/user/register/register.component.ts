import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLogged: boolean = false;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    tel: [''],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePassword: ['', [Validators.required]],
    }),
  });

  register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      username,
      email,
      passGroup: { password, rePassword } = {},
      tel,
    } = this.form.value;

    //set isloading to true
    this.isLoading = true;
    this.userService
      .register(username!, email!, password!, rePassword!, tel!)
      .subscribe(() => {
        this.router.navigate(['/themes']);
        //setisLoading to false
        this.isLoading = false;
      });
  }

  matchPasswords(): boolean {
    return (
      this.form.get('passGroup')?.get('password')?.value ===
      this.form.get('passGroup')?.get('rePassword')?.value
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
