import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {AllRoleModel} from "../../../../Model/UserSetupModel";
import {PristineToaster} from "../../../../../@pristinebase/Process/ZivameServices/PristineToaster";

@Component({
    selector: 'CreateUser-dialog-dialog',
    templateUrl: './CreateUser-dialog.component.html',
    styleUrls: ['./CreateUser-dialog.component.scss']
})
export class createUserDialogComponent implements OnInit {
    public confirmMessage: string;
    registerForm: FormGroup;
    loading: boolean = false;
    worktype: Array<{}> = [];
    AllRoleDetail: Array<AllRoleModel> = [];

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<createUserDialogComponent>,
        private webApiHttp: WebApiHttp,
        private pristineToaster: PristineToaster
    ) {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required]],
            roll_id: ['', [Validators.required]],
            password: ['', Validators.required],
            work_type: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
        });

    }

    ngOnInit(): void {
        const json = {
            flag: 'select'
        };
        try {
            this.webApiHttp.Post(this.webApiHttp.ApiURLArray.roleProcess, json)
                .then(result => {
                    // console.log(result);
                    this.AllRoleDetail = result as AllRoleModel[]
                }, error => {
                    //console.log(error)
                })
        } catch (e) {
            //console.log(e)
        }
        this.GetWorkType();
    }

    GetWorkType() {
        try {
            this.webApiHttp.Get(this.webApiHttp.ApiURLArray.GetAllWorktype)
                .then(result => {
                    //console.log(result);
                    this.worktype = result;
                    //console.log(this.worktype)
                }, error => {
                    // console.log(error)
                })
        } catch (e) {
            // console.log(e)
        }
    }

    CreateUser() {
        const json = {
            Name: this.registerForm.get('name').value,
            Email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value,
            roleId: this.registerForm.get('roll_id').value,
            shiftID: 0,
            WorkType: this.registerForm.get('work_type').value
        };
        try {
            this.webApiHttp.Post(this.webApiHttp.ApiURLArray.CreateUser, json)
                .then(result => {
                    let response: Array<{ condition: string }> = result;
                    if (response.length > 0 && response[0].condition.toLowerCase() == 'true') {
                        this.dialogRef.close();
                        this.pristineToaster.onSuccess('', 'User created Successfully')
                    } else {
                        this.pristineToaster.onError('error', '')
                    }
                }, error => {
                    //console.log(error)
                })
        } catch (e) {
            // console.log(e);
        }
    }

    cancle() {
        this.dialogRef.close();
    }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }
    if (passwordConfirm.value === '') {
        return null;
    }
    if (password.value === passwordConfirm.value) {
        return null;
    }
    return {passwordsNotMatching: true};
};
