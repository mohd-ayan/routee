import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";
import {OtpRequestPopupComponent} from "../../pages/authentication/login-2/otp-request-popup/otp-request-popup.component";
import {ViewPackingListComponent} from "./view-packing-list/view-packing-list.component";

@Component({
  selector: 'app-download-packing-list',
  templateUrl: './download-packing-list.component.html',
  styleUrls: ['./download-packing-list.component.scss']
})
export class DownloadPackingListComponent implements OnInit {

  dataSource : MatTableDataSource<rowsModel> = new MatTableDataSource<rowsModel>([]);
  packinglistresponse: rowsModel[];
  packingListDetails: packingListDetail[];
  displayColumn: string[] = ["vendor_packing_list_no", "invoice_number", "document_number" , "vendor_no" , "status" , "Actions" ]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public WebApiHttp: WebApiHttp,
              public _toasterService: PristineToaster,
              private spinner: NgxSpinnerService,
              private composeDialog: MatDialog,
              private _router: Router,
              public  fb: FormBuilder,
              private _encryptdecrypt: EncriptDecript,
              private _excelService: ExcelService,) { }

  ngOnInit() {
    this.getpackingListDetails();
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

  getpackingListDetails() {
    var json = {
      Vendor_code: this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
      flag: 'SELECT'
    };
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.getPackingList, json)
        .then(result => {
          if (result[0].condition == "TRUE") {
            this.packinglistresponse = result as rowsModel[];
            this.dataSource = new MatTableDataSource<rowsModel>(this.packinglistresponse);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.packinglistresponse = null;
          }
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
        });
  }

  viewpackingListDetails(row_element:any) {
    var json = {
      Vendor_code: this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
      Packing_List_No: row_element.vendor_packing_list_no,
      flag: 'SELECT_PACKINGLIST'
    };
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.getPackingList, json)
        .then(result => {
          if (result[0].condition == "TRUE") {
            this.packingListDetails = result as packingListDetail[];
            var dialogConfig = this.composeDialog.open(ViewPackingListComponent, {
              data: {packing_list:this.packingListDetails},
              maxWidth : '1200px',maxHeight:'700px'
            })
          } else {
            this.packingListDetails = null;
          }
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
        });
  }

  downloadpackingListDetails(row_element:any) {
    var json = {
      Vendor_code: this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
      Packing_List_No: row_element.vendor_packing_list_no,
      flag: 'SELECT_PACKINGLIST'
    };
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.getPackingList, json)
        .then(result => {
          if (result[0].condition == "TRUE") {
            this.packingListDetails = result as packingListDetail[];
            this.DownloadPackingList();
          } else {
            this.packingListDetails = null;
          }
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
        });
  }

  DownloadPackingList(){

    var temppoline: Array<any> = [];
    for (var i = 0; i < this.packingListDetails.length; i++) {

      var json = {
        vendor_Packing_list_No : this.packingListDetails[i].vendor_packing_list_no,
        document_number : this.packingListDetails[i].document_number,
        vendor_code : this.packingListDetails[i].vendor_no,
        invoice_number : this.packingListDetails[i].invoice_number,
        carton_box_number : this.packingListDetails[i].carton_box_number,
        barcode : this.packingListDetails[i].barcode,
        quantity : this.packingListDetails[i].quantity,
        status : this.packingListDetails[i].status,
        style : this.packingListDetails[i].Style,
        color : this.packingListDetails[i].Color,
        size : this.packingListDetails[i].Size,
        category : this.packingListDetails[i].category,
        mch1 : this.packingListDetails[i].mch1,
        mch2 : this.packingListDetails[i].mch2,
        mch3 : this.packingListDetails[i].mch3,
        upload_datetime : this.packingListDetails[i].upload_datetime,
      }
      temppoline.push(json);
    }

    this._excelService.exportAsExcelFile(temppoline, 'PackList_'+this.packingListDetails[0].vendor_packing_list_no);

  }

  deletepackingList(row_element:any) {
    var json = {
      Vendor_code: this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
      Packing_List_No: row_element.vendor_packing_list_no,
      flag: 'DELETE'
    };
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.getPackingList, json)
        .then(result => {
          if (result[0].condition == "TRUE") {
            this.packinglistresponse = [];
            this.dataSource.data = [];
            this.getpackingListDetails();
          } else {
            this.packingListDetails = null;
          }
          this.spinner.hide();
        }, error => {
          console.log(error);
          this.spinner.hide();
        });
  }

}

interface rowsModel {
  condition: string;
  invoice_number: string;
  document_number: string;
  vendor_no: string;
  vendor_packing_list_no: string;
  status: string;
}

interface packingListDetail {
  condition: string;
  vendor_packing_list_no: string;
  document_number: string;
  vendor_no: string;
  name:string;
  address:string;
  address2:string;
  invoice_number: string;
  carton_box_number: string;
  barcode: string;
  quantity: string;
  status: string;
  Style: string;
  Color: string;
  Size: string;
  category: string;
  mch1: string;
  mch2: string;
  mch3: string;
  upload_datetime: string;
}
