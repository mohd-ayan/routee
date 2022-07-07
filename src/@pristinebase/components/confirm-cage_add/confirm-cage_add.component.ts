import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CageZoneList} from "../../../app/Model/CageMasterModel";

@Component({
    selector: 'confirm-cage_add',
    templateUrl: './confirm-cage_add.component.html',
    styleUrls: ['./confirm-cage_add.component.scss']
})
export class ConfirmCage_addComponent {
    public confirmMessage: string;
    public inputFieldMessage: string;
    public selectFieldMessage: string;
    public dropdowndata: Array<CageZoneList>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<PristineConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmCage_addComponent>
    ) {
    }

}
