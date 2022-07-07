import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {PristineSharedModule} from '@pristinebase/shared.module';
import {Register2Component} from 'app/main/pages/authentication/register-2/register-2.component';
import {Register2Service} from "./register-2.service";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes = [
    {
        path: 'auth/register-2',
        component: Register2Component,
        resolve: {
            register: Register2Service
        }
    }
];

@NgModule({
    declarations: [
        Register2Component
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        PristineSharedModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    providers: [
        Register2Service
    ]
})
export class Register2Module {
}
