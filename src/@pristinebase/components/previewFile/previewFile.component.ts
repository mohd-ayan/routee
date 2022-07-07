import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {PickImageModel} from "../../../app/Model/pickmodel";

@Component({
    selector: 'cdk-previewFile',
    templateUrl: './previewFile.component.html',
    styleUrls: ['./previewFile.component.scss']
})
export class PreviewFileComponent implements OnInit {
    selectedimageData: PickImageModel;
    current_image: string;
    headerInfo: string;
    constructor(private dialogRef: MatDialogRef<PreviewFileComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {

        this.selectedimageData =data;
    }

    ngOnInit() {

    }


    send() {
        this.dialogRef.close();
    }
}




