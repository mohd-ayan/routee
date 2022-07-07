import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {PristineSharedModule} from '@pristinebase/shared.module';
import {PristineCountdownModule} from '@pristinebase/components';

import {ComingSoonComponent} from 'app/main/pages/coming-soon/coming-soon.component';

const routes = [
    {
        path: 'coming-soon',
        component: ComingSoonComponent
    }
];

@NgModule({
    declarations: [
        ComingSoonComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        PristineSharedModule,
        PristineCountdownModule
    ]
})
export class ComingSoonModule {
}
