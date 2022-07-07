import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PristineSharedModule} from '@pristinebase/shared.module';

const routes = [
    {
        path: 'dashboards/VendorDashboard',
        loadChildren: () => import('./dashboards/VendorDashboard/VendorDashboard.module').then(m => m.AnalyticsDashboardModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PristineSharedModule
    ]
})
export class AppsModule {
}
