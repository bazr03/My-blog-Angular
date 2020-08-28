import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_models/user.model';
import { UsersService } from '../../_services/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/_models/post.model';
import { PostsService } from 'src/app/_services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css'],
})
export class UsersDetailComponent implements OnInit, OnDestroy {
  user: User;
  posts: Post[];
  userId: string;
  isLoading = false;
  subscription: Subscription;
  constructor(
    private usersService: UsersService,
    protected postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.route.params.subscribe((params: Params) => {
    //   this.userId = params['id'];
    //   // console.log("ths id received in User-detail is: " + this.userId);
    //   this.user = this.usersService.getUser(this.userId);
    //   // this.posts = this.postsService.getPostsByUser(this.user.email);
    //   console.log('Usuario recibido en userDetail: ' + this.user.name);
    //   console.log('Posts de usuario ya en memoria: ' + this.posts);
    //   this.isLoading = false;
    // });
    // this.subscription = this.postsService.userPostsUpdated.subscribe(
    //   (posts: Post[]) => {
    //     this.posts = posts;
    //     console.log('fetched posts: ' + this.posts[0]);
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
