import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router, private authService: AuthService) { }

  isOportunidadesActive(): boolean {
    return this.router.url.startsWith('/pages/criarOportunidade');
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
