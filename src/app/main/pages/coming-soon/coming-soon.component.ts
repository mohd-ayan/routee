import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';

@Component({
    selector: 'coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class ComingSoonComponent implements OnInit {
    comingSoonForm: FormGroup;

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
        this.comingSoonForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
}
