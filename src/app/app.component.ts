import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import { Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PristineConfigService} from '@pristinebase/services/config.service';
import {PristineNavigationService} from '@pristinebase/components/navigation/navigation.service';
import {PristineSidebarService} from '@pristinebase/components/sidebar/sidebar.service';
import {PristineSplashScreenService} from '@pristinebase/services/splash-screen.service';
import {PristineTranslationLoaderService} from '@pristinebase/services/translation-loader.service';
import {locale as navigationEnglish} from 'app/navigation/i18n/en';
import {locale as navigationTurkish} from 'app/navigation/i18n/tr';
import {SwUpdate} from "@angular/service-worker";
import {Router} from "@angular/router";
import {SessionManageMent} from "../@pristinebase/Process/SessionManageMent";
import {  SignalR} from "../@pristinebase/Process/signalr/SignalR";
import {WebApiHttp} from "../@pristinebase/Process/WebApiHttp.services";
import {navigation} from 'app/navigation/navigation';
import {receiverData, ReceiveResponseMessageModel} from "./Model/SignalRModel";
import {loadingmessage, loadingstyle} from "./Model/loadingtext";
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    pristineConfig: any;
    navigation: any;
    //loading

    funny_loading_text: any = loadingmessage;
    loading_style: any = loadingstyle;
    textindex: number = 0;
    styleindex: number = 0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param _pristineConfigService
     * @param _pristineNavigationService
     * @param _pristineSidebarService
     * @param _pristineSplashScreenService
     * @param _pristineTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     * @param _sessionManageMent
     * @param swUpdate
     * @param _router
     * @param _signalR
     * @param _webapiHttp
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _pristineConfigService: PristineConfigService,
        private _pristineNavigationService: PristineNavigationService,
        private _pristineSidebarService: PristineSidebarService,
        private _pristineSplashScreenService: PristineSplashScreenService,
        private _pristineTranslationLoaderService: PristineTranslationLoaderService,
        private _translateService: TranslateService,
        private _sessionManageMent: SessionManageMent,
        private _platform: Platform,
        private swUpdate: SwUpdate,
        private _router: Router,
        private _signalR: SignalR,
        private _webapiHttp: WebApiHttp
    ) {
        // Get default navigation
        //this.navigation = navigation;

        // Register the navigation to the service
        //   this._pristineNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        // this._pristineNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._pristineTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        //TODO go to login page when use is unauthorized..
        if (this._sessionManageMent.getEmail == '')
            this._router.navigateByUrl('/pages/auth/login-2');
        else {
            this._signalR.startConnection(this._sessionManageMent.getEmail, this._webapiHttp.globalurl + this._webapiHttp.ApiURLArray.signalRNotification);
            navigation[0].children = this._sessionManageMent.getMenu[0].children;
            this._pristineNavigationService.register('main', this._sessionManageMent.getMenu);
            this._pristineNavigationService.setCurrentNavigation('main');
            receiverData.subscribe(result => {
                this.ResponseHitFromServer(result);
            });
        }
    }

    ResponseHitFromServer(data: ReceiveResponseMessageModel) {
        try {
            if (data.action == 'Logout') {
                localStorage.clear();
                window.location.reload();
            }
        } catch (e) {

        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        setInterval(() => {
            this.showRandomly();
        }, 5000);


        // Subscribe to config changes
        this._pristineConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.pristineConfig = config;

                // Boxed
                if (this.pristineConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                } else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.pristineConfig.colorTheme);
            });
        if (this.swUpdate.isEnabled) {

            this.swUpdate.available.subscribe(() => {

                if (confirm("New version available. Load New Version?")) {
                    window.location.reload();
                }
            });
        }
    }

    showRandomly() {
        this.textindex = Math.floor(Math.random() * (this.funny_loading_text.length - 1));
        this.styleindex = Math.floor(Math.random() * (this.loading_style.length - 1));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        receiverData.complete();
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
        this._pristineSidebarService.getSidebar(key).toggleOpen();
    }
}
