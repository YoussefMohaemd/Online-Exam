import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platformId for browser check
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if we're running in the browser
      const token = localStorage.getItem('userToken');
      if (!token) {
        // Redirect to login if no token is found
        this._Router.navigate(['/welcome/login']);
      }
    }
  }

  logout() {
    const token = localStorage.getItem('userToken'); // Get token from localStorage
    if (token) {
      this._AuthApiService.logout(token).subscribe({
        next: (res) => {
          console.log('User logged out successfully', res);
          localStorage.removeItem('userToken'); // Clear token from localStorage
          this._Router.navigate(['/welcome/login']); // Redirect to login page
        },
        error: (err) => {
          console.error('Error during logout', err);
          // Handle logout failure if needed
        },
      });
    } else {
      console.error('No token found for logout!');
      this._Router.navigate(['/welcome/login']); // Redirect to login anyway
    }
  }

}
