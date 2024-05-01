import { trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  elementAnimation,
  listAnimation,
} from 'src/app/animations/postListAnimation';
import { ApiService } from 'src/app/services/theme.service';
import { Post } from 'src/app/types/post';
import { Theme } from 'src/app/types/theme';
import { ProfileDetailsUser } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
  animations: [
    trigger('animate', listAnimation()),
    trigger('animateEl', elementAnimation()),
  ],
})
export class CurrentThemeComponent implements OnInit {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private viewportScroller: ViewportScroller,
  
  ) {}

  theme = {} as any;
  posts: Post[] = [];
  isEdit: boolean[] = [];
  isLoading: boolean = false;
  isPostLoading: boolean = false;
  themeOwnerDetails = {} as ProfileDetailsUser;

  user: ProfileDetailsUser = {
    username: '',
    email: '',
    tel: '',
  };

  form = this.fb.group({
    postText: ['', [Validators.required, Validators.minLength(10)]],
  });

  editForm = this.fb.group({
    postText: ['', [Validators.required, Validators.minLength(10)]],
  });

  hasLiked(post: Post): boolean {
    return post.likes.some((like) => like === this.userService.user?._id);
  }

  isOwner(postUserId: string): boolean {
    return this.userService.user?._id === postUserId;
  }

  likePost(post: Post) {
    if (this.hasLiked(post)) {
      return;
    }
    this.isPostLoading = true;
    this.api.likePost(post._id).subscribe(() => {
      this.route.paramMap.subscribe((params) => {
        this.api.getTheme(params.get('themeId')).subscribe((theme) => {
          this.theme = theme;
          this.posts = theme.posts;
          this.posts.forEach((post) => {
            this.addLengthPropertyToPost(post);
          });
          this.isPostLoading = false;
        });
      });
    });
  }

  addPost() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isPostLoading = true;
    return this.api
      .createPost(this.form.value.postText!, this.theme._id)
      .subscribe((theme) => {
        this.api.getTheme(theme._id).subscribe((theme) => {
          this.theme = theme;
          this.posts = theme.posts;
          this.posts.forEach((post) => {
            this.addLengthPropertyToPost(post);
          });
        });
        this.isPostLoading = false;
        this.form.reset();
      });
  }

  editPost(index: number) {
    if (!this.editForm.valid) {
      return;
    }
    const postId = this.theme.posts[index]._id;
    const updatedText = this.editForm.value.postText;
    this.isPostLoading = true;

    return this.api
      .editPost(this.theme._id, postId, updatedText!)
      .subscribe(() => {
        this.api.getTheme(this.theme._id).subscribe((theme) => {
          this.theme = theme;
          this.posts = theme.posts;
          this.posts.forEach((post) => {
            this.addLengthPropertyToPost(post);
          });
          this.isPostLoading = false;
          this.editForm.reset();
          this.toggleEdit(index);
        });
      });
  }

  deletePost(postId: string) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      this.api.deletePost(this.theme._id, postId).subscribe(() => {
        this.api.getTheme(this.theme._id).subscribe((theme) => {
          this.theme = theme;
          this.posts = theme.posts;
          this.posts.forEach((post) => {
            this.addLengthPropertyToPost(post);
          });
        });
      });
    }
  }

  toggleEdit(index: number): void {
    this.isEdit[index] = !this.isEdit[index];

    if (this.isEdit[index]) {
      const post = this.theme.posts[index];
      this.editForm.setValue({ postText: post.text });
    }
  }
  toggleShowFullText(post: Post) {
    post.showFullText = !post.showFullText;
  }

  addLengthPropertyToPost(post: Post) {
    post.length = post.text.length;
    if (post.length > 300) {
      post.isLong = true;
    } else {
      post.isLong = false;
    }
  }

  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!;
    this.user = {
      username,
      email,
      tel,
    };
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.api.getTheme(params.get('themeId')).subscribe((theme) => {
        //theme.userId is string, not an object
        // console.log(theme);

        this.theme = theme;
        this.posts = theme.posts;
        this.posts.forEach((post) => {
          this.addLengthPropertyToPost(post);
        });
        // Scroll to the fragment after the theme has been loaded
        this.route.fragment.subscribe((fragment) => {
          if (fragment) {
            // Use a timeout to allow the DOM to update before scrolling
            setTimeout(() => {
              this.viewportScroller.scrollToAnchor(fragment);
            }, 0);
          }
        });
        const ownerId = this.theme.userId;
        // console.log(JSON.stringify(ownerId));

        this.userService.getUser(ownerId).subscribe((user) => {
          this.themeOwnerDetails = user;
        });
        this.isLoading = false;
        this.isEdit = new Array(theme.posts.length).fill(false);
      });
    });
  }
  // user type usersId[] in themes comp from getAllThemes API call is an object

  // ngAfterViewInit(): void {
  //   this.postsContent.changes.subscribe(() => {
  //     if (this.postsContent.length > 0) {
  //       this.postsContent.forEach((item, index) => {
  //         if (
  //           item.nativeElement.scrollHeight > item.nativeElement.offsetHeight
  //         ) {
  //           this.posts[index].isLong = true;
  //         }
  //       });
  //     }
  //   });
  // }
}
