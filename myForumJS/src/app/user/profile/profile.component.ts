import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileDetailsUser } from 'src/app/types/user';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editView: boolean = false;
  subscriptions = [] as Theme[];
  userId: string = '';

  profileUser: ProfileDetailsUser = {
    username: '',
    email: '',
    tel: '',
  };

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    tel: [''],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) {}

  togleEddit(): void {
    this.editView = !this.editView;
  }

  editProfile(): void {
    if (this.form.invalid) {
      return;
    }

    this.profileUser = this.form.value as ProfileDetailsUser;
    const { username, email, tel } = this.profileUser;

    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.togleEddit();
    });
  }

  ngOnInit(): void {
    const { username, email, tel, _id } = this.userService.user!;
    this.userId = _id;
    this.api.getThemes().subscribe((themes) => {
      this.subscriptions = themes.filter((theme) =>
        theme.subscribers.includes(this.userId),
      );
    });

    this.profileUser = {
      username,
      email,
      tel,
    };

    this.form.setValue({
      username,
      email,
      tel,
    });
  }
}
