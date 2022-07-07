import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PristineSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        PristineSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        PristineSearchBarComponent
    ]
})
export class PristineSearchBarModule
{
}
