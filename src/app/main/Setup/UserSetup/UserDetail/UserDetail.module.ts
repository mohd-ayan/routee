import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {AgmCoreModule} from '@agm/core';

import {PristineSharedModule} from '@pristinebase/shared.module';
import {PristineWidgetModule} from '@pristinebase/components/widget/widget.module';

import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {UserDetailComponent} from "./UserDetail.component";
import {UserDetailService} from "./UserDetail.service";

const routes: Routes = [
    {
        path: 'userdetail',
        component: UserDetailComponent,
        resolve: {
            data: UserDetailService
        }
    }
];

@NgModule({
    declarations: [
        UserDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        PristineSharedModule,
        PristineWidgetModule,
        MatCardModule,
        MatDividerModule,
        Ng2SmartTableModule
    ],
    providers: [
        UserDetailService
    ]
})
export class UserDetailModule {
}

