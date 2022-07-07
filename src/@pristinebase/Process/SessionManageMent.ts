import {EncriptDecript} from "./EncriptDecript";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as Rx from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SessionManageMent {
    static sessionLogout: boolean = false;
    currentUser$ = new Rx.ReplaySubject(2, 100);

    constructor(private _encriptDecript: EncriptDecript,
                private _router: Router,
                private activateroute: ActivatedRoute) {
        // subscriber 1
        this.currentUser$.subscribe((data) => {
            // console.log('Subscriber A:', data);
            if (data == '') {
                if (SessionManageMent.sessionLogout == false) {
                    SessionManageMent.sessionLogout = true;
                    if (!window.location.href.includes('/pages/auth/login-2'))
                        this._router.navigateByUrl('/pages/auth/login-2');
                } else {
                    setTimeout(() => {
                            SessionManageMent.sessionLogout = false;
                        },
                        60000);
                }
            }
        });
// Behavior Subject
    }

    // todo set sessions
    setEmailSession(email_Id: string) {
        this.setCookie('ZIV_SSID', this._encriptDecript.encrypt(email_Id), 1);
        localStorage.setItem('ZIV_SSID', this._encriptDecript.encrypt(email_Id));
    }

    setNameSession(name: string) {
        localStorage.setItem('ZIV_SSNA', this._encriptDecript.encrypt(name));
    }

    setShift_IdSession(shiftname: string) {
        localStorage.setItem('ZIV_SSSHIFT', this._encriptDecript.encrypt(shiftname));
    }
    setWork_Type(workType: string) {
        localStorage.setItem('ZIV_SSWORK', this._encriptDecript.encrypt(workType));
    }

    setPhoneNoSession(phone_no: string) {
        localStorage.setItem('ZIV_PHNO', this._encriptDecript.encrypt(phone_no));
    }

    setEmail_IdsSession(email_ids: string) {
        localStorage.setItem('ZIV_EMAILIDS', this._encriptDecript.encrypt(email_ids));
    }
    setLocationCodeSession(location_code: string) {
        localStorage.setItem('ZIV_LOCCODE', this._encriptDecript.encrypt(location_code));
    }

    setMenuSession(menu: any) {
        localStorage.setItem('Ziv_menu', this._encriptDecript.encrypt(JSON.stringify(menu).toString()));
    }

    //todo end set session

    // todo get session
    get getEmail(): string {
        try {
            let email_id: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_SSID').toString());
            if (email_id != null && email_id != '' && email_id != undefined && email_id != '  ') {
                this.currentUser$.next(email_id);
                return email_id;
            }
            else {
                this.currentUser$.next('');
                return '';
            }
        } catch (e) {
            this.currentUser$.next('');
            return '';
        }
    }

    get getName(): string {
        try {
            let name: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_SSNA').toString());
            if (name != null && name != '' && name != undefined && name != '  ')
                return name;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getShiftId(): string {
        try {
            let shift: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_SSSHIFT').toString());
            if (shift != null && shift != '' && shift != undefined && shift != '  ')
                return shift;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getWorkType(): string {
        try {
            let work: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_SSWORK').toString());
            if (work != null && work != '' && work != undefined && work != '  ')
                return work;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getPhoneNo(): string {
        try {
            let phno: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_PHNO').toString());
            if (phno != null && phno != '' && phno != undefined && phno != '  ')
                return phno;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getEmailIds(): string {
        try {
            let email_ids: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_EMAILIDS').toString());
            if (email_ids != null && email_ids != '' && email_ids != undefined && email_ids != '  ')
                return email_ids;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getLocCode(): string {
        try {
            let loccode: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_LOCCODE').toString());
            if (loccode != null && loccode != '' && loccode != undefined && loccode != '  ')
                return loccode;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getMenu(): any {
        try {
            return JSON.parse(this._encriptDecript.decrypt(localStorage.getItem('Ziv_menu').toString()));
        } catch (e) {
            return undefined;
        }
    }

    //todo end get

    //todo cookie management
    private setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires: string = `expires=${d.toUTCString()}`;
        let cpath: string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

    private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    private deleteCookie(name) {
        this.setCookie(name, '', -1);
    }

    //todo end cookie
}
