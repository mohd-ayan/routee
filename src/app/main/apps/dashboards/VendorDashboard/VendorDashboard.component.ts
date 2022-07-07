import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {pristineAnimations} from '@pristinebase/animations';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {Subject} from "rxjs";
import {LocalDataSource} from "ng2-smart-table";
import {DashboardDataModel, VendorActivityLog} from "../../../../Model/DashboardDataModel";
import {ValidateResponse} from "../../../../../@pristinebase/Process/ValidateResponse";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";

@Component({
    selector: 'VendorDashboard',
    templateUrl: './VendorDashboard.component.html',
    styleUrls: ['./VendorDashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: pristineAnimations
})
export class VendorDashboardComponent implements OnInit {
    dashboardData: Array<DashboardDataModel> = [];
    vendorActivityLogs: Array<VendorActivityLog> = [];
    ZoneWiseDataSource: LocalDataSource = new LocalDataSource();
    ZoneWiseData = {
        actions: {
            add: false,
            edit: false,
            delete: false,
            position: 'right'

        },
        mode: 'external',
        setPage: false,
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-close"></i>',
            confirmDelete: true,
        },
        columns: {
            pick_zone: {
                title: 'Zone',
                type: 'string',
                filter: true
            },
            total_pick_no: {
                title: 'Total Pick ',
                type: 'string',
                filter: true
            },
            under_disti: {
                title: 'Under Distribution',
                type: 'string',
                filter: true
            },
            total_bin: {
                title: 'Total Bin to Pick ',
                type: 'string',
                filter: true
            },
            qty: {
                title: 'Total Qty',
                type: 'string',
                filter: true
            },
            worker: {
                title: 'Total Picker',
                type: 'string',
                filter: true
            },
            active_picker: {
                title: 'Active Picker',
                type: 'string',
                filter: true
            },
            runningAvrage: {
                title: 'Running Average',
                type: 'string',
                valuePrepareFunction: (col, row) => {
                    return row.total_bin / row.active_picker ==
                    Infinity || isNaN(row.total_bin / row.active_picker) ? 0 : row.total_bin / row.active_picker
                },
            },

        },

    };
    private _unsubscribeAll: Subject<any>;

    constructor(
        private validateResponse: ValidateResponse,
        public webapiHttp: WebApiHttp,
        public router: Router,
        private _encryptdecrypt: EncriptDecript
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.VendorDashboardData();
        this.GetActivityLog();
    }

    VendorDashboardData() {
        this.webapiHttp.Get(this.webapiHttp.ApiURLArray.vendorDashboardData + this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID'))).then(result => {
            if (this.validateResponse.checkArrayResponseCondition(result)) {
                this.dashboardData = result as DashboardDataModel[];
                // this.ZoneWiseDataSource.load(this.dashboardData);
            }
        }, error => {
            //console.log(error);
        });
    }

    GetActivityLog() {
        this.webapiHttp.Get(this.webapiHttp.ApiURLArray.getVendorActivityLog + this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID'))).then(result => {
            if (this.validateResponse.checkArrayResponseCondition(result)) {
                this.vendorActivityLogs = result as VendorActivityLog[];
                // this.ZoneWiseDataSource.load(this.dashboardData);
            }
        }, error => {
            //console.log(error);
        });
    }

    Convert_Byte_To_bigger(fileSize: number, decimals = 2): string {
        if (fileSize === 0 || isNaN(fileSize) || fileSize == undefined || fileSize == null) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(fileSize) / Math.log(k));
        return parseFloat((fileSize / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
}

