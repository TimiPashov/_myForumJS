import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/theme.service';
import { AuthUser } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css'],
})
export class AddThemeComponent implements OnInit {
  user: AuthUser | undefined = undefined;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
  }

  form = this.fb.group({
    themeName: ['', [Validators.required, Validators.minLength(5)]],
    postText: ['', [Validators.required, Validators.minLength(10)]],
  });

  addTheme() {
    if (this.form.invalid) {
      return;
    }

    const { themeName, postText } = this.form.value;
    //disable post button while the post is being created
    this.form.disable();
    this.api.createTheme(themeName!, postText!).subscribe(() => {
      this.router.navigate(['/themes']);
      this.form.enable();
    });
  }

  onCancel() {
    this.router.navigate(['/themes']);
  }

  ngOnInit(): void {

    if (this.user) {
      this.user = this.userService.user!;
    } else {
      // Redirect the user to the login page or handle the scenario appropriately
      this.router.navigate(['/login']);
    }
  }
}
