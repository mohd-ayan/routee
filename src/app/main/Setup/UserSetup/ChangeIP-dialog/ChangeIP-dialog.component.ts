import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {PristineToaster} from "../../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'CreateUser-dialog-dialog',
    templateUrl: './ChangeIP-dialog.component.html',
    styleUrls: ['./ChangeIP-dialog.component.scss']
})
export class changeIPDialogComponent implements OnInit {
    public ipcontrol = new FormControl('', Validators.required);
    public portcontrol = new FormControl('', Validators.required);
    public email;

    constructor(
        public dialogRef: MatDialogRef<changeIPDialogComponent>,
        private webApiHttp: WebApiHttp,
        private pristineToaster: PristineToaster
    ) {

    }

    ngOnInit(): void {

    }

    setipchange() {
        if (this.isnumeric(this.portcontrol) && this.ValidateIPaddress(this.ipcontrol)) {
            const json = {"Email": this.email, "PrinterIP": this.ipcontrol.value, "PrinterPort": this.portcontrol.value}
            this.webApiHttp.Post(this.webApiHttp.ApiURLArray.AddPrinterIPaddress, json).then(result => {
                let response: Array<{ condition: string; message: string }> = result;
                if (response[0].condition.toLowerCase() == 'true') {
                    this.pristineToaster.onSuccess('', response[0].message);
                    this.dialogRef.close(true);
                } else {
                    this.pristineToaster.onError('error', response[0].message)
                }
            }, error => this.pristineToaster.onWarning("Warn", 'Server Response Error')).catch(
                () => {
                    this.pristineToaster.onWarning("Warn", 'Server Response Error')
                }
            )
        }
    }

    isnumeric(formcon: any): boolean {
        if (isNaN(formcon.value) || formcon.value.toString().includes('e') || formcon.value.toString().includes('.')) {
            this.pristineToaster.onWarning("Warn", 'Please Input Only numbers');
            formcon.setValue('9100');
            return false;
        }
        return true;
    }

    ValidateIPaddress(inputText: any) {
        var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (inputText.value.match(ipformat)) {
            return true;
        } else {
            this.pristineToaster.onWarning("Warn", 'You have entered an invalid IP address!');
            inputText.setValue('');
            return false;
        }
    }
}
