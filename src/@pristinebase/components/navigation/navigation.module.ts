import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';

import { PristineNavigationComponent } from './navigation.component';
import { PristineNavVerticalItemComponent } from './vertical/item/item.component';
import { PristineNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { PristineNavVerticalGroupComponent } from './vertical/group/group.component';
import { PristineNavHorizontalItemComponent } from './horizontal/item/item.component';
import { PristineNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        PristineNavigationComponent
    ],
    declarations: [
        PristineNavigationComponent,
        PristineNavVerticalGroupComponent,
        PristineNavVerticalItemComponent,
        PristineNavVerticalCollapsableComponent,
        PristineNavHorizontalItemComponent,
        PristineNavHorizontalCollapsableComponent
    ]
})
export class PristineNavigationModule
{
}
