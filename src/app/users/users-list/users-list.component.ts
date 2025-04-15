import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users:User[] = [];
  isLoading:boolean = false;
  error:string = '';
  searchTerm: string = '';

  constructor(private UserService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.isLoading = true;
    this.UserService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Error fetching users';
        this.isLoading = false;
      }
    );
  }
  goToDetails(userId: number): void {
    console.log("salma");
    console.log(userId);
    this.router.navigate(['/users', userId]);
  }

  get filteredUsers(): User[] {
    if (!this.searchTerm) return this.users;
  
    const lowerTerm = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().startsWith(lowerTerm) ||
      user.email.toLowerCase().startsWith(lowerTerm)
    );
  }
}
