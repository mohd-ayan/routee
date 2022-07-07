import {Component, ViewEncapsulation} from '@angular/core';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';

@Component({
    selector: 'maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class MaintenanceComponent {
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
