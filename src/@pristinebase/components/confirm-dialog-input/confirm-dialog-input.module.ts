import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from "@angular/flex-layout";
import {PristineConfirmDialogInputComponent} from "./confirm-dialog-input.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        PristineConfirmDialogInputComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule
    ],
    entryComponents: [
        PristineConfirmDialogInputComponent
    ],
})
export class PristineConfirmDialogInputModule {
}
