import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';
import {PristineModule} from '@pristinebase/pristine.module';
import {PristineSharedModule} from '@pristinebase/shared.module';
import {PristineProgressBarModule, PristineSidebarModule, PristineThemeOptionsModule} from '@pristinebase/components';
import {pristineConfig} from 'app/pristine-config';
import {AppComponent} from 'app/app.component';
import {AppStoreModule} from 'app/store/store.module';
import {LayoutModule} from 'app/layout/layout.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {NgxSpinnerModule} from "ngx-spinner";
import {PreviewFileComponent} from "../@pristinebase/components/previewFile/previewFile.component";

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'setup',
        loadChildren: () => import('./main/Setup/Setup.module').then(m => m.SetupModule)
    },
    {
        path: 'purchase',
        loadChildren: () => import('./main/purchase/purchase.module').then(m => m.PurchaseModule)
    },
    {
        path: 'vendor',
        loadChildren: () => import('./main/vendor/vendor.module').then(m => m.VendorModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./main/about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'packing',
        loadChildren: () => import('./main/packing/packing.module').then(m => m.PackingModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./main/user/user.module').then(m => m.UserModule)
    },
    {
        path: '**',
        redirectTo: 'apps/dashboards/VendorDashboard'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        PreviewFileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,
        NgxSpinnerModule,
        // Material
        MatButtonModule,
        MatIconModule,
        // Pristine modules
        PristineModule.forRoot(pristineConfig),
        PristineProgressBarModule,
        PristineSharedModule,
        PristineSidebarModule,
        PristineThemeOptionsModule,
        // App modules
        LayoutModule,
        AppStoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents:[PreviewFileComponent],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
})
export class AppModule {
}

