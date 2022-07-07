import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'pristine-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class PristineConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<PristineConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<PristineConfirmDialogComponent>
    )
    {
    }

}
