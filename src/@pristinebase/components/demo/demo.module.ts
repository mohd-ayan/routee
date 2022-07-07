import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { PristineDemoContentComponent } from './demo-content/demo-content.component';
import { PristineDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        PristineDemoContentComponent,
        PristineDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        PristineDemoContentComponent,
        PristineDemoSidebarComponent
    ]
})
export class PristineDemoModule
{
}
