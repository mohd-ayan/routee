import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'pristine-confirm-dialog-input',
    templateUrl: './confirm-dialog-input.component.html',
    styleUrls: ['./confirm-dialog-input.component.scss']
})
export class PristineConfirmDialogInputComponent {
    public confirmMessage: string;
    public inputFieldMessage: string;
    public optionalFieldMessage: string;
    public optionalInputFieldMessage: string;
    public addbutton: string = 'Add';
    public optionalField:boolean=false
    /**
     * Constructor
     *
     * @param {MatDialogRef<PristineConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<PristineConfirmDialogInputComponent>
    ) {
    }

}
