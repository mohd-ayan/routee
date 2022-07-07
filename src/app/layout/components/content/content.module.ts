import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PristineSharedModule } from '@pristinebase/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        PristineSharedModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
