import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PristineConfigService} from '@pristinebase/services/config.service';
import {pristineAnimations} from '@pristinebase/animations';
import {Router} from "@angular/router";
import {Login2Service} from "./login-2.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginModel} from "../../../../Model/LoginModel";
import {PristineNavigationService} from "../../../../../@pristinebase/components/navigation/navigation.service";
import {navigation} from 'app/navigation/navigation';
import {SessionManageMent} from "../../../../../@pristinebase/Process/SessionManageMent";
import {ValidateResponse} from "../../../../../@pristinebase/Process/ValidateResponse";
import {PristineToaster} from "../../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {SignalR} from "../../../../../@pristinebase/Process/signalr/SignalR";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {receiverData} from "../../../../Model/SignalRModel";
import {DashboardDataModel} from "../../../../Model/DashboardDataModel";
import {OtpRequestPopupComponent} from "./otp-request-popup/otp-request-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class Login2Component implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading: boolean = false;
    login: boolean = false;
    password_show : boolean = false;
    next : boolean = true;
    forget : boolean = false;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * Constructor
     *
     * @param {PristineConfigService} _PristineConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _PristineConfigService: PristineConfigService,
        private _formBuilder: FormBuilder,
        private _sessionManageMent: SessionManageMent,
        private _validateResponse: ValidateResponse,
        private _router: Router,
        private _pristinetoster: PristineToaster,
        private _login2Service: Login2Service,
        private _snackBar: MatSnackBar,
        private _pristineNavigationService: PristineNavigationService,
        private _signalR: SignalR,
        private _webapiHttp: WebApiHttp,
        private _configRef:MatDialog
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
        //TODO go to login page when use is unauthorized..
        if (this._sessionManageMent.getEmail != '')
            this._router.navigateByUrl('/apps/dashboards/VendorDashboard');
        else
            this._router.navigateByUrl('/pages/auth/login-2');
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['']
        });

    }

    show_password(formdata: { email: string, password: string }): void{
        try{
            this.loading = true;
            this.next = false;
            var json = {Email: formdata.email, flag: 'check_password'};
            this._webapiHttp.Post(this._webapiHttp.ApiURLArray.forgetpassword,json).then(result => {
                if (this._validateResponse.checkArrayResponseCondition(result)) {
                    if(result[0].message.toString().includes("OTP is send")){
                        this._pristinetoster.onSuccess('Success',result[0].message);
                        this.next = true;
                        this.loading = false;
                        var dialogConfig = this._configRef.open(OtpRequestPopupComponent, {
                            data: {flag:'create',vendor_code:formdata.email,otp_password:result[0].otp_password},
                            width : '500px'
                        })
                    }else{
                        this.password_show = true;
                        this.login = true;
                        this.next = false;
                        this.loading = false;
                    }
                }else{
                    this._pristinetoster.onError('Error',result[0].message);
                    this.loading = false;
                    this.next = true;
                }
            }, error => {
                this._pristinetoster.onError('Error',error);
                this.loading = false;
                this.next = true;
            });
        }catch (e) {
            console.log(e)
            this.loading = false;
            this.next = true;
        }
    }

    forget_password(formdata: { email: string, password: string }): void {
        try{
            if(formdata.email == undefined || formdata.email == null || formdata.email == ''){
                this._pristinetoster.onError('Error', 'Vendor Code is required');
                return;
            }
            this.forget = true;
            var json = {Email: formdata.email, flag: 'forget_password'};
            this._webapiHttp.Post(this._webapiHttp.ApiURLArray.forgetpassword,json).then(result => {
                this.forget = false;
                if (this._validateResponse.checkArrayResponseCondition(result)) {
                    if(result[0].message.toString().includes("OTP is send")){
                        this._pristinetoster.onSuccess('Success',result[0].message);
                        this.next = true;
                        this.loading = false;
                        var dialogConfig = this._configRef.open(OtpRequestPopupComponent, {
                            data: {flag:'forget',vendor_code:formdata.email,otp_password:result[0].otp_password},
                            width : '500px'
                        })
                    }
                }else{
                    this._pristinetoster.onError('Error',result[0].message);
                }
            }, error => {
                this.forget = false;
                this._pristinetoster.onError('Error',error);
            });
        }catch (e) {
            console.log(e)
            this.forget = false;
        }
    }

    loginUser(formdata: { email: string, password: string }): void {
        this.loading = true;
        this.login = false;
        var json = {Email: formdata.email, password: formdata.password};
        this._login2Service.getLoginAccess(json).then((result: LoginModel) => {
            if (!this._validateResponse.checkArray(result)) {
                if (this._validateResponse.checkObjectResponseCondition(result) == true) {
                    // let temp: PristineNavigation[] = navigation;
                    navigation[0].children = result.menu;
                    //temp = navigationProject;
                    //todo set sesion for this website;
                    this._sessionManageMent.setEmailSession(formdata.email);
                    this._sessionManageMent.setMenuSession(navigation);
                    this._sessionManageMent.setNameSession(result.name);
                    this._sessionManageMent.setWork_Type(result.workType);
                    this._sessionManageMent.setPhoneNoSession(result.phoneNo);
                    this._sessionManageMent.setEmail_IdsSession(result.email_ids);
                    this._sessionManageMent.setLocationCodeSession(result.locationCode);
                    this._sessionManageMent.setShift_IdSession((result.shiftID == null || result == undefined) ? '0' : result.shiftID);
                    //todo end Session
                    this._pristineNavigationService.register('main', navigation);
                    this._pristineNavigationService.setCurrentNavigation('main');
                    this._signalR.startConnection(this._sessionManageMent.getEmail, this._webapiHttp.globalurl + this._webapiHttp.ApiURLArray.signalRNotification);
                    receiverData.subscribe(result => {
                        try {
                            if (result.action == 'Logout') {
                                localStorage.clear();
                                window.location.reload();
                            }
                        } catch (e) {

                        }
                    });
                    this._router.navigateByUrl('/apps/dashboards/VendorDashboard');
                } else {
                    this._pristinetoster.onError('Error', result.message);
                    this.loading = false;
                    this.login = true;
                }
            } else {
                this._pristinetoster.onError('Error', result[0].message);
                this.loading = false;
                this.login = true;
            }
        }).catch(err => {
            this.loading = false;
            this.login = true;
        });
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'Clear', {
            duration: 5000,
        });
    }

    ngOnDestroy(): void {
    }
}
