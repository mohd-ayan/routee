import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { PristineConfigService } from '@pristinebase/services/config.service';
import { PristineNavigationService } from '@pristinebase/components/navigation/navigation.service';
import { PristinePerfectScrollbarDirective } from '@pristinebase/directives/pristine-perfect-scrollbar/pristine-perfect-scrollbar.directive';
import { PristineSidebarService } from '@pristinebase/components/sidebar/sidebar.service';
import {SessionManageMent} from "../../../../../../@pristinebase/Process/SessionManageMent";

@Component({
    selector     : 'navbar-vertical-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy
{
    pristineConfig: any;
    navigation: any;

    // Private
    private _pristinePerfectScrollbar: PristinePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     * @param {PristineNavigationService} _PristineNavigationService
     * @param {PristineSidebarService} _PristineSidebarService
     * @param {Router} _router
     */
    constructor(
        private _PristineConfigService: PristineConfigService,
        private _PristineNavigationService: PristineNavigationService,
        private _PristineSidebarService: PristineSidebarService,
        private _router: Router,
        public sessionManageMent:SessionManageMent
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(PristinePerfectScrollbarDirective, {static: true})
    set directive(theDirective: PristinePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._pristinePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._PristineNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._pristinePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        this._pristinePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._PristineSidebarService.getSidebar('navbar') )
                    {
                        this._PristineSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Subscribe to the config changes
        this._PristineConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.pristineConfig = config;
            });

        // Get current navigation
        this._PristineNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._PristineNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._PristineSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._PristineSidebarService.getSidebar('navbar').toggleFold();
    }
}
