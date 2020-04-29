import { Post } from "../posts/post.model";

export class User {
  private posts?: Post[];

  constructor(
    public readonly _id: string,
    public name: string,
    public lastName: string,
    public email: string
  ) {}

  getPosts() {
    if (this.posts) {
      return [...this.posts];
    } else {
      return [];
    }
  }

  savePosts(posts: Post[]) {
    this.posts = [...posts];
  }
}
