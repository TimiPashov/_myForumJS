import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService) { }

  private subscription = {} as Subscription;
  posts: Post[] = [];
  isloading: boolean = true;

  ngOnInit(): void {
    // this.subscription = this.api.getPosts(5).subscribe(posts => {
    //   this.posts = posts;
    //   this.isloading = false;
    // })
    this.subscription = this.api.getPosts(5).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isloading = false;
      },
      error: (err) => {
        this.isloading = false;
        console.error('Error:', err);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
