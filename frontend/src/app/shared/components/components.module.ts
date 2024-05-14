import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [HeaderComponent, NavbarComponent, FooterComponent, MenuComponent, MatIconModule, MatToolbarModule, MatButtonModule]
})
export class ComponentsModule { }
