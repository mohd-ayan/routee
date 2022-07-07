import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PristineConfirmDialogComponent } from '@pristinebase/components/confirm-dialog/confirm-dialog.component';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        PristineConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    entryComponents: [
        PristineConfirmDialogComponent
    ],
})
export class PristineConfirmDialogModule
{
}
