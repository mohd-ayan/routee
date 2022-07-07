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

import {Ng2SmartTableModule} from "ng2-smart-table";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRippleModule} from "@angular/material/core";
import {VendorDashboardComponent} from "./VendorDashboard.component";
import {VendorDashboardService} from "./VendorDashboard.service";
import {MatListModule} from "@angular/material/list";

const routes: Routes = [
    {
        path: '**',
        component: VendorDashboardComponent,
        resolve: {
            data: VendorDashboardService
        }
    }
];

@NgModule({
    declarations: [
        VendorDashboardComponent
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
        Ng2SmartTableModule,
        MatCardModule,
        MatProgressBarModule,
        MatRippleModule,
        MatListModule
    ],
    providers: [
        VendorDashboardService
    ]
})
export class AnalyticsDashboardModule {
}

