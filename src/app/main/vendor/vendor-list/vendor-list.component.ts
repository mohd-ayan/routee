import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Purchase_admin_log_model} from "../../purchase/purchase-admin-log/purchase_admin_log_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {Vendor_list_model} from "./vendor_list_model";

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  dataSource : MatTableDataSource<Vendor_list_model> = new MatTableDataSource<Vendor_list_model>([]);
  purchase_order_list: Array<Vendor_list_model> = [];
  displayColumn: string[] = ["vendorNo", "name" , "address", "phoneNo","eMail","locationCode","vendorType","View"]
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
    this.dataSource = new MatTableDataSource<Vendor_list_model>(this.purchase_order_list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.GetAllVendorList();
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

  GetAllVendorList() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getAllVendorList)
        .then(result => {
          this.purchase_order_list = result as Vendor_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.dataSource = new MatTableDataSource<Vendor_list_model>(this.purchase_order_list);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
          } else {
            this._toasterService.onError('error', this.purchase_order_list[0].message)
            this.spinner.hide();
          }
        }, err => {
          this._toasterService.onError('error', err)
          this.spinner.hide();
        }).finally(()=>{
      this.spinner.hide();
    })
  }

  ViewVendorProfile(row_element:any){
    this._router.navigate(['/vendor/vendor_info',{response:this._encryptdecrypt.encrypt(row_element.vendorNo),edit:this._encryptdecrypt.encrypt('true')}]);
  }

  DownloadVendorList(){

    var temppoline: Array<any> = [];
    for (var i = 0; i < this.dataSource.data.length; i++) {

      var json = {
        vendorNo:this.dataSource.data[i].vendorNo,
        name:this.dataSource.data[i].name,
        address:this.dataSource.data[i].address,
        address2:this.dataSource.data[i].address2,
        city:this.dataSource.data[i].city,
        phoneNo:this.dataSource.data[i].phoneNo,
        country:this.dataSource.data[i].country,
        eMail:this.dataSource.data[i].eMail,
        locationCode:this.dataSource.data[i].locationCode,
        vendorType:this.dataSource.data[i].vendorType,
        tolerance_percentage:this.dataSource.data[i].tolerance_percentage,
        gstRegistrationNo:this.dataSource.data[i].gstRegistrationNo,
        gstVendorType:this.dataSource.data[i].gstVendorType,

      }
      temppoline.push(json);
    }

    this._excelService.exportAsExcelFile(temppoline, 'VendorList');

  }

}
