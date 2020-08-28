import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { User } from '../../_models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[];
  usersSubsc: Subscription;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // this.users = this.usersService.getUsers();
    // this.usersSubsc = this.usersService.usersUpdated.subscribe(
    //   (users: User[]) => {
    //     this.users = users;
    //   }
    // );
  }
  ngOnDestroy() {
    this.usersSubsc.unsubscribe();
  }
}
