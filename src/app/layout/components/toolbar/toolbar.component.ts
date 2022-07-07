import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

import {PristineConfigService} from '@pristinebase/services/config.service';
import {PristineSidebarService} from '@pristinebase/components/sidebar/sidebar.service';

import {navigation} from 'app/navigation/navigation';
import {Router} from "@angular/router";
import {SessionManageMent} from "../../../../@pristinebase/Process/SessionManageMent";
import {FormControl} from "@angular/forms";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {resultMemoize} from "@ngrx/store";
import {isArray} from "rxjs/internal-compatibility";
import {ValidateResponse} from "../../../../@pristinebase/Process/ValidateResponse";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     * @param {PristineSidebarService} _PristineSidebarService
     * @param {TranslateService} _translateService
     */
    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    constructor(
        private _PristineConfigService: PristineConfigService,
        private _PristineSidebarService: PristineSidebarService,
        private _translateService: TranslateService,
        public _sessionManagement: SessionManageMent,
        public  webApiHttp:WebApiHttp,
        public validateResponse:ValidateResponse,
        private _router: Router,
        private _encryptdecrypt: EncriptDecript
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

       // console.log(navigation)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._PristineConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    LogoutFrom_Server() {
        this.webApiHttp.Post(this.webApiHttp.ApiURLArray.Logout,{
           Email:this._sessionManagement.getEmail
        }).then((result:Array<{
            condition: string;
            action: string;
            email_id: string;
            connection_id:string;
        }>)=>{
            if(isArray(result) && this.validateResponse.checkObjectResponseCondition(result)){
                try {
                    localStorage.clear();
                    window.location.reload();
                } catch (e) {
                } finally {
                    window.location.reload();
                }
            }
        },err=>{

        }).then(err1=>{

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._PristineSidebarService.getSidebar(key).toggleOpen();
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    AddNewUser() {
        this._router.navigateByUrl('/pages/auth/register-2');
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        //console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    viewVendorInfo(){
        this._router.navigate(['/vendor/vendor_info',{response:localStorage.getItem('ZIV_SSID'),edit:this._encryptdecrypt.encrypt('false')}]);
    }
}
