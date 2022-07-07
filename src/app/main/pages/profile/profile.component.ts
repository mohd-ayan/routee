import {Component, ViewEncapsulation} from '@angular/core';

import {pristineAnimations} from '@pristinebase/animations';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class ProfileComponent {
    /**
     * Constructor
     */
    constructor() {

    }
}
