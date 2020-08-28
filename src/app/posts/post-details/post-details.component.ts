import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/_models/post.model";
import { PostsService } from "src/app/_services/posts.service";
import { PostComment } from "src/app/_models/Comment.model";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"],
})
export class PostDetailsComponent implements OnInit {
  postId: string;
  post: Post;
  isLoading = false;
  showComments = false;
  areCommentsLoading = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.postId = this.route.snapshot.params.id;
    // console.log(this.postId);
    this.getPost();
    this.postsService.postCommentsUpdated.subscribe(
      (postCom: { postId: string; comments: PostComment[] }) => {
        // console.log('comentarios recibidos en componente: ', postCom.comments);
        if (this.postId === postCom.postId) {
          this.post.comments = postCom.comments;
          this.areCommentsLoading = false;
        }
      }
    );
  }

  getPost() {
    this.post = this.postsService.getPost(this.postId);
    // console.log(this.post);
    this.isLoading = false;
  }

  getPostComments() {
    this.areCommentsLoading = true;
    this.post.comments = this.postsService.getPostComments(this.postId);
    if (this.post.comments?.length > 0) {
      this.areCommentsLoading = false;
    }
  }
}
