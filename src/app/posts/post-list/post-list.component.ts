import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/_services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/_models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  private postsSubscription: Subscription;
  posts: Post[];
  isLoading = false;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.posts = this.postService.getPosts();
    if (this.posts) {
      this.isLoading = false;
    }
    this.postsSubscription = this.postService.PostsUpdated.subscribe( (posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false;
    } );
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
