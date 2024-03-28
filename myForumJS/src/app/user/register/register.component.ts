import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  form = this.fb.group({

    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    tel: [''],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePassword: ['', [Validators.required]]
    })
  });

  register(): void {
    if (this.form.invalid) {
      return;
    }


    const {
      username,
      email,
      passGroup: { password, rePassword } = {},
      tel
    } = this.form.value;


    this.userService.register(username!, email!, password!, rePassword!, tel!)
      .subscribe(() => {
        this.router.navigate(['/themes'])
      })
  }

  matchPasswords(): boolean {  

    return this.form.get('passGroup')
    ?.get('password')
    ?.value === this.form.get('passGroup')
    ?.get('rePassword')?.value;
  }
}
