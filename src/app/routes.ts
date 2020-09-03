import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { PostsComponent } from "./posts/posts.component";
import { UsersDetailComponent } from "./users/users-detail/users-detail.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { HomeComponent } from "./home/home.component";
import { PostDetailsComponent } from "./posts/post-details/post-details.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: "", component: UsersListComponent },
      { path: ":id", component: UsersDetailComponent },
    ],
  },
  {
    path: "posts",
    component: PostsComponent,
    children: [
      { path: "", component: PostListComponent },
      { path: ":id", component: PostDetailsComponent },
      { path: ":id/edit", component: PostEditComponent },
    ],
  },
  { path: "", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
