import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  toggleDarkMode() {
    // Your code to toggle dark mode goes here.
  }
  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
