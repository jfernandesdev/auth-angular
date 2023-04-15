import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'auth-angular';
  isMenuRequired = false;
  isAdminUser = false;

  constructor(private router:Router, private service: AuthService) {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }

    if(this.service.getUserRole() === 'admin'){
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}
