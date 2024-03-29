import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';
import { Theme } from 'src/app/types/theme';
import { ProfileDetailsUser } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css']
})
export class CurrentThemeComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService, private router: Router) { }


  theme = {} as Theme;


  user: ProfileDetailsUser = {
    username: '',
    email: '',
    tel: ''
  }

  form = this.fb.group({
    postText: ['', [Validators.required]]
  })

  addPost() {
    if (!this.form.valid) {
      return;
    }

    return this.api.createPost(this.form.value.postText!, this.theme._id).subscribe((theme) => {
      this.api.getTheme(theme._id).subscribe(theme => this.theme = theme);
      this.form.reset();
    })

  }

  likePost(post: Post) {
    if (this.hasLiked(post)) {
      return;
    }
    this.api.likePost(post._id).subscribe(() => {
      this.route.paramMap.subscribe(params => {
        this.api.getTheme(params.get('themeId')).subscribe(theme => {
          this.theme = theme;
        })
      })
    })
  }

  get hasLiked(): (post: Post) => boolean {
    return (post: Post) =>{
      return post.likes.some(like => like === this.userService.user?._id);
    }
  }

  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!
    this.user = {
      username,
      email,
      tel
    }

    this.route.paramMap.subscribe(params => {
      this.api.getTheme(params.get('themeId')).subscribe(theme => {
        this.theme = theme;
      })
    })
  }
}
