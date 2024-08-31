// src/app/core/core.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule 
    ],
    exports: [
        RouterModule
    ],
})
export class CoreModule { }
