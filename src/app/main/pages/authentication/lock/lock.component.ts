import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';

@Component({
    selector: 'lock',
    templateUrl: './lock.component.html',
    styleUrls: ['./lock.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class LockComponent implements OnInit {
    lockForm: FormGroup;

    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _PristineConfigService: PristineConfigService,
        private _formBuilder: FormBuilder
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.lockForm = this._formBuilder.group({
            username: [
                {
                    value: 'Katherine',
                    disabled: true
                }, Validators.required
            ],
            password: ['', Validators.required]
        });
    }
}
