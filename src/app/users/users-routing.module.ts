import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
    { path: '', component: UsersListComponent , data: {title: 'Users'} },
    { path: ':id', component: UserDetailsComponent , data: {title: 'User Details'}},
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule {}