import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthUser } from 'src/app/types/user';
import { FormBuilder } from '@angular/forms';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editView: boolean = false;

  user = {} as AuthUser;

  form = this.formBuilder.group({
    username: [''],
    email: [''],
    tel: ['']
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }



  togleEddit() {
    this.userService.getProfile().subscribe(
      pipe(user => {
        this.user = user
        this.editView = !this.editView;
        this.form.setValue({
          username: user.username,
          email: user.email,
          tel: user.tel
        })
      })
    )

  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      pipe(user => this.user = user)
    )
  }

}
