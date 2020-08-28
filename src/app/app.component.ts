import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "./_services/users.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  usersLength: number;
  subscription: Subscription;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // this.usersLength = this.usersService.getUsersLength();
    // if (!this.usersLength) {
    //   console.log("llamando a fectch");
    //   this.usersService.fetchUsers();
    // }
    // console.log(this.usersLength);
    // this.subscription = this.usersService.usersLengthChanged.subscribe(
    //   (length) => {
    //     this.usersLength = length;
    //     console.log("user length chamged");
    //   }
    // );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
