import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PerfilComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        ContentComponent,
        RouterModule
    ]
})
export class PerfilModule { }
