import { NgIf } from '@angular/common';
import { Component, HostListener, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthApiService } from 'auth-api';
import { ToastModule } from 'primeng/toast';
import {  DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    DialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  isMobileView: boolean = false;
  isSidebarVisible: boolean = false;

  constructor(
    private router: Router,
    private _AuthApiService: AuthApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    this.updateMobileView();
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  visible: boolean = false;

  showLogoutDialog() {
    this.visible = true
  }

  logout(): void {
    this._AuthApiService.Logout().subscribe({
      next: (res) => {
        console.log('User logged out successfully', res);
        localStorage.removeItem('userToken');
        this.router.navigate(['welcome/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }





  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateMobileView();
  }

  private updateMobileView(): void {
    if (typeof window !== 'undefined') {
      this.isMobileView = window.innerWidth <= 768;
      if (!this.isMobileView) {
        this.isSidebarVisible = false;
      }
    }
  }
}
