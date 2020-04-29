import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from "rxjs/operators";
import { UsersService } from "../users/users.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  userPostsUpdated = new Subject<Post[] | []>();
  constructor(private http: HttpClient, private usersService: UsersService) {}

  fetchPostsByUser(email: string) {
    console.log("Ejecutando fetchPostsByUser! ");
    const graphqlQuery = {
      query: `
            query getUserPosts($email:String!){
                getPostsByUser(email: $email){
                    _id
                     title
                    body
                    createdAt
                    creator{
                        email
                      }
                    }
                }
            `,
      variables: {
        email: email.trim(),
      },
    };

    this.http
      .post<{
        data: {
          getPostsByUser: {
            title: string;
            body: string;
            _id: string;
            createdAt: string;
            creator: { email: string };
          }[];
        };
      }>("http://localhost:4000/graphql", graphqlQuery)
      .pipe(
        map((resData) => {
          return resData.data.getPostsByUser.map((post) => {
            return {
              _id: post._id,
              title: post.title,
              body: post.body,
              createdAt: post.createdAt,
              creator: post.creator.email,
            };
          });
        })
      )
      .subscribe((posts: Post[]) => {
        console.log(posts);
        this.usersService.saveUserPosts(email, posts);
        this.userPostsUpdated.next(posts);
      });
  }

  getPostsByUser(email: string) {
    console.log("ejecutando getPostsByUser");
    // if (this.posts) {
    //   console.log("Posts ya existen");
    //   return this.posts.filter((post) => post.creator === email);
    // }
    // console.log("Posts no existen, haciendo llamada http");
    // this.fetchPostsByUser(email);
    const posts = this.usersService.getUserPosts(email);
    if (posts.length > 0) {
      console.log("Posts ya existen");
      return posts;
    }

    this.fetchPostsByUser(email);
    console.log("Posts no existen, haciendo llamada http");
  }
}
