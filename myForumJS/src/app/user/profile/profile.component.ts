import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { ProfileDetailsUser } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editView: boolean = false;

  user: ProfileDetailsUser = {
    username: '',
    email: '',
    tel: ''
  }

  form = this.formBuilder.group({
    username: [''],
    email: [''],
    tel: ['']
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }



  togleEddit() {
    this.editView = !this.editView;
  }

  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!
    this.user = {
      username,
      email,
      tel
    }

    this.form.setValue({
      username,
      email,
      tel
    })
  }
}
