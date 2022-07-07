import { NgModule } from '@angular/core';

import { PristineSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        PristineSidebarComponent
    ],
    exports     : [
        PristineSidebarComponent
    ]
})
export class PristineSidebarModule
{
}
