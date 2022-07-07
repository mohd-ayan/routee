import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WebApiHttp} from '../../../../../@pristinebase/Process/WebApiHttp.services'
import {RegisterModel} from "../../../../Model/RegisterModel";
import {PromiseResponse} from "../../../../Model/PromiseResponse";
import {ShiftModel} from "../../../../Model/ShiftModel";

@Injectable()
export class Register2Service implements Resolve<any> {
    RollList: Array<RegisterModel> | PromiseResponse;
    AllShift: Array<ShiftModel> | PromiseResponse;

    constructor(
        private WebApiHttp: WebApiHttp
    ) {
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getRollList(), this.getallShift()
            ]).then(
                ([rolllistdata, allshift]) => {
                    this.RollList = rolllistdata;
                    this.AllShift = allshift;
                    resolve();
                },
                reject
            ).catch(err => {
                reject(err)
            });
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getRollList(): Promise<any> {
        var json = {flag: 'select', userId: '', roleName: '', roleId: 0}
        return new Promise((resolve, reject) => {
            this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.roleProcess, json).then(
                result => resolve(result), reject
            ).catch(error => reject(error));
        });
    }

    getallShift(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.allShift).then(
                result => resolve(result), reject
            ).catch(error => reject(error));
        });
    }

    postRegisterValue(postedjson: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.createUser, postedjson).then(result => resolve(result), reject)
                .catch(error => reject(error));
        });
    }
}
