import {Component, OnInit, ViewChild} from '@angular/core';
import {Vendor_list_model} from "../vendor-list/vendor_list_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-vendor-info',
  templateUrl: './vendor-info.component.html',
  styleUrls: ['./vendor-info.component.scss']
})
export class VendorInfoComponent implements OnInit {

  vendor_code : string;
  edit : string;
  purchase_order_list: Array<Vendor_list_model> = [];

  VendorNo : FormControl = new FormControl();
  VendorName : FormControl = new FormControl();
  Contact : FormControl = new FormControl();
  PhoneNo : FormControl = new FormControl();
  Address1 : FormControl = new FormControl();
  Address2 : FormControl = new FormControl();

  Email : FormControl = new FormControl();
  PostCode : FormControl = new FormControl();
  GstVendorType : FormControl = new FormControl();
  GstRegistrationNo : FormControl = new FormControl();
  TolerancePercentage : FormControl = new FormControl();

  constructor(public WebApiHttp: WebApiHttp,
              public _toasterService: PristineToaster,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private composeDialog: MatDialog,
              private _router: Router,
              public  fb: FormBuilder,
              private _encryptdecrypt: EncriptDecript,
              private _excelService: ExcelService,) {
      this.vendor_code = this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('response'));
      this.edit = this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('edit'));
  }

  ngOnInit() {
    this.GetVendorInfo();
  }

  GetVendorInfo() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getVendorDetail + this.vendor_code )
        .then(result => {
          this.purchase_order_list = result as Vendor_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
            this.spinner.hide();
            this.bindVendorDetails();
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

  bindVendorDetails(){
      this.VendorNo.setValue(this.purchase_order_list[0].vendorNo);
      this.VendorName.setValue(this.purchase_order_list[0].name);
      this.Contact.setValue(this.purchase_order_list[0].contact);
      this.PhoneNo.setValue(this.purchase_order_list[0].phoneNo);
      this.Address1.setValue(this.purchase_order_list[0].address);
      this.Address2.setValue(this.purchase_order_list[0].address2);
      this.Email.setValue(this.purchase_order_list[0].eMail);
      this.PostCode.setValue(this.purchase_order_list[0].postCode);
      this.GstVendorType.setValue(this.purchase_order_list[0].gstVendorType);
      this.GstRegistrationNo.setValue(this.purchase_order_list[0].gstRegistrationNo);
      this.TolerancePercentage.setValue(this.purchase_order_list[0].tolerance_percentage);
  }

  updateTolerance(){
    if(this.TolerancePercentage.value < 0){
        this._toasterService.onInfo('info', 'please fill valid tolerance percentage')
        return;
    }
    this.spinner.show();
    const json = {
        "vendorNo":this.VendorNo.value,
        "tolerance_percentage":this.TolerancePercentage.value
    }
    this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.updateVendorTolerance, json )
        .then(result => {
            this.purchase_order_list = result as Vendor_list_model[];
            if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase()=='true') {
                this._toasterService.onSuccess('success', this.purchase_order_list[0].message)
                this.spinner.hide();
                this.GetVendorInfo();
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

}
