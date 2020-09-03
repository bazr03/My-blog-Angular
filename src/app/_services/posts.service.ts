import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../_models/post.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { PostComment } from "../_models/Comment.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  PostsUpdated = new Subject<Post[]>();
  postCommentsUpdated = new Subject<{
    postId: string;
    comments: PostComment[];
  }>();
  private posts: Post[];
  private comments: PostComment[] = [];
  private baseUrl = "http://localhost:4000/graphql";

  constructor(private http: HttpClient) {}

  private graphqlRequest(query, variables) {
    return this.http.post(this.baseUrl, { query, variables });
  }

  private fetchPosts() {
    const query = `
      query  {
        posts: getPosts{
          _id
         title
         body
         createdAt
         totalComments
         creator{
           _id
           name
           lastName
         }
       }
       }
    `;

    this.graphqlRequest(query, null)
      .pipe(
        map((res: any) => {
          /// console.log(res);
          return res.data.posts.map((post) => {
            return {
              _id: post._id,
              title: post.title,
              body: post.body,
              createdAt: post.createdAt,
              creator: post.creator,
              totalComments: post.totalComments,
            };
          });
        })
      )
      .subscribe((posts: Post[]) => {
        // console.log(posts);
        this.posts = posts;
        this.PostsUpdated.next([...this.posts]);
      });
  }

  private fetchCommentsByPost(postId: string) {
    const query = `
      query getComments($_id: ID!)  {
        post: getPost(_id: $_id){
          title
          comments{
            _id
            body
            creator{
              _id
              name
              lastName
            }
          }
        }
       }
    `;

    this.graphqlRequest(query, { _id: postId })
      .pipe(
        map((res: any) => {
          return res.data.post.comments.map((cmt) => {
            return {
              _id: cmt._id,
              body: cmt.body,
              creator: cmt.creator,
              postId
            };
          });
        })
      )
      .subscribe((comments: PostComment[]) => {
        this.saveComments(comments);
        this.postCommentsUpdated.next({ postId, comments });
      });
  }
  getPosts() {
    if (this.posts) {
      // console.log("Posts ya en memoria: ", this.posts);
      return [...this.posts];
    } else {
      // console.log("Post no en memoria, haciendo request al servicdor");
      this.fetchPosts();
      return null;
    }
  }

  getPost(id: string) {
    const post = this.posts.find((p) => p._id === id);
    return post;
  }

  getPostComments(postId: string) {
    const comments = this.findComments(postId);
    console.log("Comments returned by findComments()", comments);
    if (comments.length <= 0) {
      console.log("No Hay comentarios en memoria");
      this.fetchCommentsByPost(postId);
      return;
    }
    console.log("Comentarios en memoria, retornandolos")
    return comments;
  }

  private findComments(postId: string) {
    const comments = this.comments.filter((cmt) => cmt.postId === postId);
    return comments;
  }

  private saveComments(incomingComments: PostComment[]) {

    if(incomingComments.length <= 0) return;
    if (this.comments.length <= 0 ) {
      this.comments = incomingComments;
      return;
    }

    const commentsUpdate= [...this.comments];
    let tempComm;
    incomingComments.forEach((inCmt, index) => {
      tempComm = commentsUpdate.find(cmt => cmt._id === inCmt._id);

      if (!tempComm ) {
        commentsUpdate.push(inCmt);
      }

    });

    this.comments = commentsUpdate;
  }
  // fetchPostsByUser(email: string) {
  //   console.log('Ejecutando fetchPostsByUser! ');
  //   const graphqlQuery = {
  //     query: `
  //           query getUserPosts($email:String!){
  //               getPostsByUser(email: $email){
  //                   _id
  //                    title
  //                   body
  //                   createdAt
  //                   creator{
  //                       email
  //                     }
  //                   }
  //               }
  //           `,
  //     variables: {
  //       email: email.trim(),
  //     },
  //   };

  //   this.http
  //     .post<{
  //       data: {
  //         getPostsByUser: {
  //           title: string;
  //           body: string;
  //           _id: string;
  //           createdAt: string;
  //           creator: { email: string };
  //         }[];
  //       };
  //     }>('http://localhost:4000/graphql', graphqlQuery)
  //     .pipe(
  //       map((resData) => {
  //         return resData.data.getPostsByUser.map((post) => {
  //           return {
  //             _id: post._id,
  //             title: post.title,
  //             body: post.body,
  //             createdAt: post.createdAt,
  //             creator: post.creator.email,
  //           };
  //         });
  //       })
  //     )
  //     .subscribe((posts: Post[]) => {
  //       console.log(posts);
  //       this.PostsUpdated.next(posts);
  //     });
  // }

  // getPostsByUser(email: string) {
  //   console.log('ejecutando getPostsByUser');
  //   // if (this.posts) {
  //   //   console.log("Posts ya existen");
  //   //   return this.posts.filter((post) => post.creator === email);
  //   // }
  //   // console.log("Posts no existen, haciendo llamada http");
  //   // this.fetchPostsByUser(email);
  //   const posts = this.usersService.getUserPosts(email);
  //   if (posts.length > 0) {
  //     console.log('Posts ya existen');
  //     return posts;
  //   }

  //   this.fetchPostsByUser(email);
  //   console.log('Posts no existen, haciendo llamada http');
  // }
}
