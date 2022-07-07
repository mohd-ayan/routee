import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';
import {Register2Service} from "./register-2.service";
import {RegisterModel} from "../../../../Model/RegisterModel";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PromiseResponse} from "../../../../Model/PromiseResponse";
import {ShiftModel} from "../../../../Model/ShiftModel";

@Component({
    selector: 'register-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class Register2Component implements OnInit, OnDestroy {
    RollList: Array<RegisterModel> = [];
    AllShift: Array<ShiftModel> = [];
    registerForm: FormGroup;
    loading: boolean = false;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _PristineConfigService: PristineConfigService,
        private _formBuilder: FormBuilder,
        private _register2Service: Register2Service,
        private _snackBar: MatSnackBar
    ) {
        // Configure the layout
        this._PristineConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        let tempdataroll: Array<RegisterModel> | PromiseResponse = this._register2Service.RollList;
        let tempdatashift: Array<ShiftModel> | PromiseResponse = this._register2Service.AllShift;
        if (Array.isArray(tempdataroll))
            this.RollList = tempdataroll;
        else
            this.openSnackBar(tempdataroll.message);

        if (Array.isArray(tempdatashift))
            this.AllShift = tempdatashift;
        else
            this.openSnackBar(tempdatashift.message);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    openSnackBar(message: string) {
        this._snackBar.open(message, '', {
            duration: 2000,
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required]],
            roll_id: ['', [Validators.required]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            shiftID: ['', Validators.required],
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    submitForm() {
        this.loading = true;
        var json = {
            Name: this.registerForm.get('name').value,
            Email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value,
            roleId: this.registerForm.get('roll_id').value
        };
        this._register2Service.postRegisterValue(json).then((result: Array<RegisterModel>) => {
            this.loading = false;
            if (result[0].condition.toLowerCase() == 'true') {
                this.openSnackBar(result[0].message);
                this.registerForm.reset();
            } else
                this.openSnackBar(result[0].message);
        }, error => {
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
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
