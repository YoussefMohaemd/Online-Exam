import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomePageComponent } from "./core/pages/welcome-page/welcome-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WelcomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Online-Exam';
}
