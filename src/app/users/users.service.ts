import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Post } from "../posts/post.model";

@Injectable({ providedIn: "root" })
export class UsersService {
  usersUpdated = new Subject<User[]>();
  usersLengthChanged = new Subject<number>();
  private users: User[];

  constructor(private http: HttpClient) {}

  fetchUsers() {
    const graphqlQuery = {
      query: `
        {
          getUsers{
            users{
              _id
              name
              lastName
              email
            }
          }
        }
      `,
    };
    this.http
      .post<{ data: { getUsers: { users: User[] } } }>(
        "http://localhost:4000/graphql",
        graphqlQuery
      )
      .pipe(
        map((resData) => {
          // console.log(resData.data.getUsers);
          return resData.data.getUsers.users.map((user) => {
            return new User(user._id, user.name, user.lastName, user.email);
          });
        })
      )
      .subscribe((users: User[]) => {
        this.users = users;
        this.usersLengthChanged.next(this.users.length);
        this.usersUpdated.next(this.users);
      });
  }

  getUsersLength() {
    if (this.users) {
      return this.users.length;
    }

    return 0;
  }
  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    // console.log("Usuarios al solicitar un usuario" + this.users);
    return this.users.find((user) => user._id === id);
  }

  getUserPosts(email: string) {
    const user = this.users.find((user) => user.email === email);
    const posts = user.getPosts();
    return posts;
  }

  saveUserPosts(email: string, posts: Post[]) {
    const user = this.users.find((user) => user.email === email);
    user.savePosts(posts);
    return true;
  }
}
