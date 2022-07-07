import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WebApiHttp} from '../../../../../@pristinebase/Process/WebApiHttp.services'

@Injectable()
export class Login2Service implements Resolve<any> {
    constructor(
        private WebApiHttp: WebApiHttp
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    }

    getLoginAccess(postedjson: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.login, postedjson).then(result => resolve(result), reject)
                .catch(error => reject(error));
        });
    }
}
