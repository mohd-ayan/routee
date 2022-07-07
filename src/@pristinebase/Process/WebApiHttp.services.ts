import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WebApiHttp implements OnInit {

    // public globalurl: string = 'https://zivamehhd.pristinefulfil.com';
    public globalurl: string = 'https://seedbase.pristinefulfil.com';
    // public globalurl: string = 'https://localhost:44385';

    private apiURLArray = {

        login: '/api/UserLogin/Login',
        forgetpassword: '/api/UserLogin/ForgotPassword',
        Logout: '/api/UserLogin/Logout',
        createUser: '/api/UserLogin/CreateUser',
        getAllUser: '/api/UserLogin/getAllUser',
        roleProcess: '/api/Role/RoleProcess',
        signalRNotification: '/Notification',

        //vendor
        getAllVendorList: '/api/Vendor/getAllVendorList',
        getVendorDetail: '/api/Vendor/getVendorDetail?vendorNo=',
        updateVendorTolerance: '/api/Vendor/updateVendorTolerance',

        //purchaseOrder
        getPoHeader: '/api/PurchaseOrder/getPoHeader?vendor_code=',
        getPoLine: '/api/PurchaseOrder/getPoLine?purchase_order_no=',
        getAllPoHeader: '/api/PurchaseOrder/getAllPoHeader',
        purchaseOrderBarcodes: '/api/PurchaseOrder/purchaseOrderBarcodes',
        poLinesRePrintBarcodes: '/api/PurchaseOrder/poLinesRePrintBarcodes',
        getPurchaseOrderLog: '/api/PurchaseOrder/getPurchaseOrderLog',
        getPurchaseOrderAdminLog: '/api/PurchaseOrder/getPurchaseOrderAdminLog',
        getPurchaseOrderReportLog: '/api/PurchaseOrder/getPurchaseOrderReportLog?vendor_code=',
        purchaseOrderReportDownload: '/api/PurchaseOrder/purchaseOrderReportDownload',
        purchaseOrderDownloadErrorReport: '/api/PurchaseOrder/purchaseOrderDownloadErrorReport',

        //packingList
        getPackingList: '/api/PackingList/getPackingList',
        packing_list_upload: '/api/PackingList/packing_list_upload',
        itemcodeBarcodeListUpload: '/api/PackingList/itemcodeBarcodeListUpload',
        itemcodeBarcodeListDetails: '/api/PackingList/itemcodeBarcodeListDetails',

        // dashboard
        vendorDashboardData : '/api/Dashboard/vendorDashboardData?vendor_code=',
        getVendorActivityLog : '/api/Dashboard/getVendorActivityLog?vendor_code=',

        DashboardData: '/api/OutBoundDashboard/dashboard_Data?order_type=',
        WaveWiseZoneActivity: '/api/OutBoundDashboard/WaveWiseZoneActivity?emailid=',
        PendingReport: '/api/Report/PendingInfo',
        PendingInfoWithData: '/api/Report/PendingInfoWithData',

    };
    public ApiURLArray: any = this.apiURLArray;

    constructor(private httpClient: HttpClient
    ) {

    }

    get getHTTPHeader(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    ngOnInit(): void {

    }

    getHTTPHeaderAuth(token: string): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
    }

    // post data to server
    async Post(path: string, jsondata: any): Promise<any> {
        try {
            path = this.globalurl + path;

            var heasd: HttpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
            })

            var headers = this.getHTTPHeader;
            return await new Promise<any>((resolve, reject) => {
                this.httpClient.post<any>(path, JSON.stringify(jsondata), headers).toPromise().then(result => resolve(result), error => reject({
                    condition: 'False',
                    message: error.message
                })).catch(err => reject({condition: 'False', message: err.message}));
            });
        } catch (e) {
            return new Promise<any>((resolve) => {
                resolve({condition: 'False', message: e.message})
            });
        }
    }

    // get data to the server
    async Get(path: string): Promise<any> {
        try {
            path = this.globalurl + path;
            var headers = this.getHTTPHeader;
            return await new Promise<any>((resolve, reject) => {
                this.httpClient.get<any>(path, headers).toPromise().then(result => resolve(result), error => reject({
                    condition: 'False',
                    message: error.message
                })).catch(err => reject({condition: 'False', message: err.message}));
            });
        } catch (e) {
            return new Promise<any>((resolve) => {
                resolve({condition: 'False', message: e.message})
            });
        }
    }

    // post data to server and get two type of response
    Post_Data_GetFile(path: string, jsondata: any) {
        path = this.globalurl + path;
        const request = new HttpRequest('POST', path, jsondata, {
            responseType: 'blob',
            reportProgress: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
        return this.httpClient.request(request);
    }

    Get_Data_With_DownloadStatus_GetFile(path: string) {
        path = this.globalurl + path;
        const request = new HttpRequest('GET', path, {
            responseType: 'blob',
            reportProgress: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
        return this.httpClient.request(request);
    }

    Post_Data_With_DownloadStatus_GetFile(path: string,jsondata : any) {
        path = this.globalurl + path;
        const request = new HttpRequest('POST', path, jsondata, {
            responseType: 'blob',
            reportProgress: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
        return this.httpClient.request(request);
    }

    blobToString(b) {
        var urldata, x;
        urldata = URL.createObjectURL(b);
        x = new XMLHttpRequest();
        x.open('GET', urldata, false); // although sync, you're not fetching over internet
        x.send();
        URL.revokeObjectURL(urldata);
        return x.responseText;
    }
}
