import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPosts(5).subscribe(posts => console.log(posts))
  }
}
