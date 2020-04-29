import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UsersComponent } from "./users/users.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersDetailComponent } from "./users/users-detail/users-detail.component";
import { PostsComponent } from "./posts/posts.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    UsersListComponent,
    UsersDetailComponent,
    PostsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
