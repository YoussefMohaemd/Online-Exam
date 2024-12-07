import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports:[RouterOutlet,RouterLink],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]); // التنقل إلى الصفحة المناسبة
  }
}
