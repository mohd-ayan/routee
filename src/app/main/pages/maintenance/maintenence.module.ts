import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PristineSharedModule} from '@pristinebase/shared.module';

import {MaintenanceComponent} from 'app/main/pages/maintenance/maintenance.component';

const routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent
    }
];

@NgModule({
    declarations: [
        MaintenanceComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        PristineSharedModule
    ]
})
export class MaintenanceModule {
}
