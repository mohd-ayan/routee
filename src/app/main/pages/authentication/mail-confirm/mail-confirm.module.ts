import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

import {PristineSharedModule} from '@pristinebase/shared.module';

import {MailConfirmComponent} from 'app/main/pages/authentication/mail-confirm/mail-confirm.component';

const routes = [
    {
        path: 'auth/mail-confirm',
        component: MailConfirmComponent
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,

        PristineSharedModule
    ]
})
export class MailConfirmModule {
}
