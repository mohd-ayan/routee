import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PurchaseOrderListModule} from "../purchase-order-list/purchase-order-list.module";
import {Purchase_order_list_model} from "../purchase-order-list/purchase_order_list_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {Download_barcode_model} from "./download_barcode_model";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-download-barcode',
  templateUrl: './download-barcode.component.html',
  styleUrls: ['./download-barcode.component.scss']
})
export class DownloadBarcodeComponent implements OnInit {
  loading: boolean = false;
  dataSource : MatTableDataSource<Download_barcode_model> = new MatTableDataSource<Download_barcode_model>([]);
  purchase_order_list: Array<Download_barcode_model> = [];
  displayColumn: string[] = ["purchaseOrderNo", "buyFromVendorNo" , "startBarcodeSeries", "endBarcodeSeries" , "quantity" , "status" , "download"]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
              public WebApiHttp: WebApiHttp,
              public _toasterService: PristineToaster,
              private spinner: NgxSpinnerService,
              private composeDialog: MatDialog,
              private _router: Router,
              public  fb: FormBuilder,
              private _encryptdecrypt: EncriptDecript) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Download_barcode_model>(this.purchase_order_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getPurchaseOrderReportLog();
  }

  applyFilter(filterValue: string, keyName: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
        return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
      } else {
        return false
      }

    };
  }

  getPurchaseOrderReportLog() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPurchaseOrderReportLog +
        this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')))
        .then(result => {
          this.purchase_order_list = result as Download_barcode_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<Download_barcode_model>(this.purchase_order_list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
          } else {
            this._toasterService.onError('error', 'Data Not Found')
            this.spinner.hide();
          }
        }, err => {
          this._toasterService.onError('error', err)
          this.spinner.hide();
        }).finally(()=>{
      this.spinner.hide();
    })
  }

  ViewPurchaseOrder(row_element : any){
    if (row_element.status == 'READY FOR DOWNLOAD' || row_element.status == 'DOWNLOADED') {
      this.reportGenrateByServer(row_element.buyFromVendorNo, row_element.fileName, row_element.id, row_element.purchaseOrderNo);
    } else {
      if (row_element.status == 'IN PROCESS') {
        this._toasterService.onError('Error', 'Report is in Processing')
      }else if(row_element.status == 'PENDING'){
        this._toasterService.onError('Error', 'Report is yet to Processing')
      }
      else {
        this._toasterService.onError('Error', 'Please Contact Administration')
      }
    }
  }

  ReCreatePrint(row_element : any){
    this.loading = true;
    this.WebApiHttp.Post_Data_With_DownloadStatus_GetFile(this.WebApiHttp.ApiURLArray.purchaseOrderDownloadErrorReport, {
      BuyFromVendorNo: row_element.BuyFromVendorNo,
      FileName: row_element.fileName,
      id: row_element.id
    }).subscribe((event: HttpEvent<any>) => {
      try {
        switch (event.type) {
          case HttpEventType.Sent:
            //   console.log('Request started');
            this.loading = false;
            break;
          case HttpEventType.ResponseHeader:
            //  console.log('Headers received ->', event.headers);
            break;
          case HttpEventType.DownloadProgress:
            this.downloadeskb = Math.round(event.loaded / 1024);
            this.totalsizeDowloadFile = Math.round(event.total / 1024);
            this.downloadValue = Math.ceil(Math.round((event.loaded / 1024) * 100) / this.totalsizeDowloadFile);
            //  console.log(`Downloading ${ this.downloadValue} kb downloaded ${ this.totalsizeDowloadFile}`);
            break;
          case HttpEventType.Response:
            //  console.log('Finished -> ', event.body);
            if (event.body.type == "application/pdf") {
              FileSaver.saveAs(event.body, row_element.purchaseOrderNo + '_Barcode_Report.pdf');
              this.getPurchaseOrderReportLog();
              this._toasterService.onInfo('Info', 'Successfull file Downloaded')
            } else if (event.body.type == "application/json") {
              const blb = new Blob([event.body], {type: "text/plain"});
              // console.log(blb.slice(0,blb.size));
              var jsonresult: any;
              var reader = new FileReader();
              reader.onload = function () {
                jsonresult = JSON.parse(reader.result.toString());
                if (jsonresult[0].condition.toUpperCase() == "FALSE") {
                  alert(jsonresult[0].message);
                }
              }
              reader.readAsText(blb);
            }
            this.downloadValue = 0;
            this.totalsizeDowloadFile = 0;
            break;
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.spinner.hide();
      }
      this.spinner.hide();
    })
  }

  //upload image   //upload file
  downloadeskb=0;
  downloadValue = 0;
  totalsizeDowloadFile = 0;

  reportGenrateByServer(BuyFromVendorNo: string, filename: string, id: string, purchaseOrderNo: string) {
    this.loading = true;
    this.WebApiHttp.Post_Data_With_DownloadStatus_GetFile(this.WebApiHttp.ApiURLArray.purchaseOrderReportDownload, {
      BuyFromVendorNo: BuyFromVendorNo,
      FileName: filename,
      id: id
    }).subscribe((event: HttpEvent<any>) => {
      try {
        switch (event.type) {
          case HttpEventType.Sent:
            //   console.log('Request started');
            this.loading = false;
            break;
          case HttpEventType.ResponseHeader:
            //  console.log('Headers received ->', event.headers);
            break;
          case HttpEventType.DownloadProgress:
            this.downloadeskb = Math.round(event.loaded / 1024);
            this.totalsizeDowloadFile = Math.round(event.total / 1024);
            this.downloadValue = Math.ceil(Math.round((event.loaded / 1024) * 100) / this.totalsizeDowloadFile);
            //  console.log(`Downloading ${ this.downloadValue} kb downloaded ${ this.totalsizeDowloadFile}`);
            break;
          case HttpEventType.Response:
            //  console.log('Finished -> ', event.body);
            if (event.body.type == "application/pdf") {
              FileSaver.saveAs(event.body, purchaseOrderNo + '_Barcode_Report.pdf');
              this.getPurchaseOrderReportLog();
              this._toasterService.onInfo('Info', 'Successfull file Downloaded')
            } else if (event.body.type == "application/json") {
              const blb = new Blob([event.body], {type: "text/plain"});
              // console.log(blb.slice(0,blb.size));
              var jsonresult: any;
              var reader = new FileReader();
              reader.onload = function () {
                jsonresult = JSON.parse(reader.result.toString());
                if (jsonresult[0].condition.toUpperCase() == "FALSE") {
                  alert(jsonresult[0].message);
                }
              }
              reader.readAsText(blb);
            }
            this.downloadValue = 0;
            this.totalsizeDowloadFile = 0;
            break;
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.spinner.hide();
      }
      this.spinner.hide();
    })
  }
}
