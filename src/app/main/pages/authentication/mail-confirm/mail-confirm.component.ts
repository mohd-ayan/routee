import {Component, ViewEncapsulation} from '@angular/core';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';

@Component({
    selector: 'mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls: ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class MailConfirmComponent {
    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     */
    constructor(
        private _PristineConfigService: PristineConfigService
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
}
