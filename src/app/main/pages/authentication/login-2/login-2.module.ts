import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {PristineSharedModule} from '@pristinebase/shared.module';

import {Login2Component} from 'app/main/pages/authentication/login-2/login-2.component';
import {Login2Service} from "./login-2.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { OtpRequestPopupComponent } from './otp-request-popup/otp-request-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";

const routes = [
    {
        path: 'auth/login-2',
        component: Login2Component,
        resolve: {
            login: Login2Service
        }
    }
];

@NgModule({
    declarations: [
        Login2Component,
        OtpRequestPopupComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        PristineSharedModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatDividerModule,
        MatToolbarModule,
    ],
    providers: [
        Login2Service
    ],entryComponents: [
        OtpRequestPopupComponent
    ]
})
export class Login2Module {
}
