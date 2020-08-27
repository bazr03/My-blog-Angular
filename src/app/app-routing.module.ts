import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { PostsComponent } from "./posts/posts.component";
import { UsersDetailComponent } from "./users/users-detail/users-detail.component";
import { UsersListComponent } from "./users/users-list/users-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/users", pathMatch: "full" },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: "", component: UsersListComponent },
      { path: ":id", component: UsersDetailComponent },
    ],
  },
  { path: "posts", component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
