import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SessionManageMent} from "../SessionManageMent";

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private _authService: SessionManageMent, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.getEmail != "") {
            return true;
        }

        // navigate to login page
        this._router.navigateByUrl('/pages/auth/login-2');
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    }

}
