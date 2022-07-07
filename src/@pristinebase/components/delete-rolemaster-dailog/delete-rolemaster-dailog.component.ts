import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'delete-rolemaster-dailog',
    templateUrl: './delete-rolemaster-dailog.component.html',
    styleUrls: ['./delete-rolemaster-dailog.component.scss']
})
export class DeleteRolemasterDailogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteRolemasterDailogComponent>
    ) {
    }

    ngOnInit(): void {

    }

}
