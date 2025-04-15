import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  error = '';
  userSections: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const userId = +idParam;
      this.fetchUser(userId);
    }
  }

  fetchUser(id: number): void {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.user = user;
        this.isLoading = false;
        this.userSections = [
          {
            title: 'Personal Information',
            fields: [
              { label: 'Name', key: this.user.name},
              { label: 'Username', key: this.user.username},
              { label: 'Email', key: this.user.email},
              { label: 'Phone', key: this.user.phone},
              { label: 'Website', key: this.user.website}
            ]
          },
          {
            title: 'Address',
            fields: [
              { label: 'Street', key: this.user.address.street },
              { label: 'Suite', key: this.user.address.suite },
              { label: 'City', key: this.user.address.city },
              { label: 'Zipcode', key: this.user.address.zipcode },
              { label: 'Geo', key: "lat: " + this.user.address.geo.lat + ', lng: ' + this.user.address.geo.lng },
            ]
          },
          {
            title: 'Company',
            fields: [
              { label: 'Name', key: this.user.company.name },
              { label: 'Catch Phrase', key: this.user.company.catchPhrase },
              { label: 'BS', key: this.user.company.bs }  
            ]
          }
        ];
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.error = 'Error loading user details';
        this.isLoading = false;
      }
    });
  }
  getValueFromPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
