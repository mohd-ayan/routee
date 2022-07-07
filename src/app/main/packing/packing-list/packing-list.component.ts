import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {po_line_barcode, View_purchase_order_model} from "../../purchase/view-purchase-order/view_purchase_order_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EncriptDecript} from "../../../../@pristinebase/Process/EncriptDecript";
import {PristineToaster} from "../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {ExcelService} from "../../../../@pristinebase/Process/excel.Service";
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.services";
import {Purchase_order_list_model} from "../../purchase/purchase-order-list/purchase_order_list_model";
import {Observable} from "rxjs";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent implements OnInit {

  vendorName: FormControl = new FormControl();
  sel_purchase_no: FormControl = new FormControl();
  dataSource: MatTableDataSource<ExcelModel> = new MatTableDataSource<ExcelModel>([]);
  purchase_order_list: Array<Purchase_order_list_model> = [];
  purchase_order_line: Array<View_purchase_order_model> = [];
  sendPackingListModels: Array<SendPackingListModel> = [];
  displayColumn: string[] = ['InvoiceNo', 'VendorNo', 'PONumber', 'BoxNo', 'Barcode', 'Quantity']
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public WebApiHttp: WebApiHttp,
              private route: ActivatedRoute,
              private configRef: MatDialog,
              public  _encryptdecrypt: EncriptDecript,
              public _toasterService: PristineToaster,
              private router: Router,
              private spinner: NgxSpinnerService,
              private _excelService: ExcelService,) {
    this.vendorName.setValue(this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSNA')) +
        ' ( ' + this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')) + ' ) ')
  }

  ngOnInit() {
    this.GetPurchaseOrderData();
  }

  filter_purchase_order_list: Array<Purchase_order_list_model> = [];

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();
    this.filter_purchase_order_list = this.purchase_order_list.filter(option => option.purchaseOrderNo.toLowerCase().includes(filterValue));
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

  GetPurchaseOrderData() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPoHeader +
        this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')) + '&status=PENDING')
        .then(result => {
          this.purchase_order_list = result as Purchase_order_list_model[];
          if (this.purchase_order_list.length > 0 && this.purchase_order_list[0].condition.toLowerCase() == 'true') {
            this.spinner.hide();
          } else {
            this._toasterService.onError('error', 'Data Not Found')
            this.spinner.hide();
          }
        }, err => {
          this._toasterService.onError('error', err)
          this.spinner.hide();
        }).finally(() => {
      this.spinner.hide();
    })
  }

  getpoline() {
    this.spinner.show();
    this.WebApiHttp.Get(this.WebApiHttp.ApiURLArray.getPoLine + this.sel_purchase_no.value)
        .then(result => {
          this.purchase_order_line = result as View_purchase_order_model[];
          if (this.purchase_order_line.length > 0 && this.purchase_order_line[0].condition.toLowerCase() == 'true') {
            this.spinner.hide();
          } else {
            this._toasterService.onError('error', 'Data Not Found')
            this.spinner.hide();
          }
        }, err => {
          this._toasterService.onError('error', err)
          this.spinner.hide();
        }).finally(() => {
      this.spinner.hide();
    })
  }

  sample_packing() {

    var temppoline: Array<any> = [];
    for (var i = 0; i < 1; i++) {

      var json = {
        InvoiceNo: '',
        VendorNo: this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
        PONumber: '',
        BoxNo: '',
        Barcode: '',
        Quantity: '',
      }
      temppoline.push(json);
    }

    this._excelService.exportAsExcelFile(temppoline, 'SamplePacking');

  }

  arrayBuffer: any;
  file: File;
  validateUploadorNot: boolean = false;
  progressValue: number = 0;
  uploadedData: ExcelModel[];
  progressbarshow: boolean = false;

  fileOpener() {

    if (this.sel_purchase_no.value == undefined || this.sel_purchase_no.value == null || this.sel_purchase_no.value == '') {
      this._toasterService.onWarning('Warn', 'Please Select Purchase Order No');
      return;
    }

    this.getpoline();

    var input_element: any = document.createElement('input');
    input_element.setAttribute('type', 'file');
    input_element.setAttribute('accept', '.xlsx,.xls,.csv')
    input_element.click();
    input_element.addEventListener('change', event => {
      this.incomingfile(event)
    });

  }

  async incomingfile(event) {

    this.spinner.show();
    this.progressValue = 20;
    this.progressbarshow = true;
    this.file = event.target.files[0];
    if (this.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type == 'application/vnd.ms-excel') {
      var subscriberOfobservable = new Observable(observable => {
        try {
          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            this.progressValue = 50;
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            this.progressValue = 75;
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            this.progressValue = 80;
            var workbook = XLSX.read(bstr, {type: "binary", raw: true, cellText: true, cellStyles: true});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            this.uploadedData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
            this.arrangeDataForUi();
          }
          fileReader.readAsArrayBuffer(this.file);
        } catch (error) {
          console.log(error);
          this._toasterService.onError('error', 'File is Not Readable')
          this.progressbarshow = false;
        }
      });
      this.validateUploadorNot = true;
      subscriberOfobservable.subscribe(result => {
        console.log("result", result);
      });
    } else {
      this._toasterService.onError('error', `Please Select only Excel file`)
      this.progressbarshow = false;
      this.spinner.hide();
    }
  }

  headerArray: string[];

  arrangeDataForUi() {
    try {
      this.dataSource = new MatTableDataSource<ExcelModel>(this.uploadedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.progressValue = 100;
    } catch (e) {
      this._toasterService.onError('warning', 'Data Not Found in Excel')
      this.progressValue = 100;
    } finally {
      this.spinner.hide();
    }
  }

  //for hide android keyboard
  hideKeyboard() {
    var activeElement = document.activeElement;
    activeElement.setAttribute('readonly', 'readonly');
    setTimeout(function () {
      activeElement.removeAttribute('readonly');
    }, 10);
  }

  removeAllFileData() {
    this.headerArray = null;
    this.uploadedData = null;
    // this.packinglistresponse = null;
    this.validateUploadorNot = false;
    this.progressValue = 0;
    this.progressbarshow = false;
  }

  PostFileData() {
    this.sendPackingListModels = [];
    this.spinner.show()
    var validate_excel: boolean = false;
    var vlidate_invoiceno: string = '';
    for (var i = 0; i < this.uploadedData.length; i++) {
      if (!this.uploadedData[i].hasOwnProperty('InvoiceNo')) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'InvoiceNo are missing Row :- ' + (i + 1) + ' from Excel...')
        break;
      }
      if (!this.uploadedData[i].hasOwnProperty('VendorNo')) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'VendorNo are missing Row :- ' + (i + 1) + ' from Excel...')
        break;
      }
      if (!this.uploadedData[i].hasOwnProperty('PONumber')) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'PONumber are missing Row :- ' + (i + 1) + ' from Excel...')
        break;
      }
      if (!this.uploadedData[i].hasOwnProperty('BoxNo')) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'BoxNo are missing Row :- ' + (i + 1) + ' from Excel...')
        break;
      }
      if (!this.uploadedData[i].hasOwnProperty('Barcode')) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'Barcode are missing Row :- ' + (i + 1) + ' from Excel...')
        break;
      }
      if (!this.uploadedData[i].hasOwnProperty('Quantity')) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'Quantity are missing Row :- ' + (i + 1) + ' from Excel...')
        break;
      }
      if (i == 0) {
        vlidate_invoiceno = this.uploadedData[0].InvoiceNo;
      }
      if (vlidate_invoiceno.toUpperCase() != this.uploadedData[i].InvoiceNo.toUpperCase()) {
        validate_excel = true;
        this.spinner.hide();
        this._toasterService.onError('error', 'Barcode are missing Row :- ' + (i + 1) + ' from Excel...');
        break;
      }
      if (this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')).toUpperCase() != this.uploadedData[i].VendorNo.toUpperCase()) {
        validate_excel = true;
        this.spinner.hide();
        this._toasterService.onError('error', 'Vendor_code are missing Row :- ' + (i + 1) + ' from Excel...');
        break;
      }
      if (this.sel_purchase_no.value.toUpperCase() != this.uploadedData[i].PONumber.toUpperCase()) {
        validate_excel = true;
        this.spinner.hide();
        this._toasterService.onError('error', 'PO number not matched Row : ' + (i + 1) + ' with the Excel..');
        break;
      }
      if (parseInt(this.uploadedData[i].Quantity) <= 0) {
        this.spinner.hide();
        validate_excel = true;
        this._toasterService.onError('error', 'Quantity must be >0 Row :- ' + (i + 1) + ' from Excel...');
        break;
      }
      //verify mid to po's barcode
      var verifyMid: boolean = false;
      var verifyQuantity: boolean = false;
      if (this.purchase_order_line.length > 0) {
        console.log(this.purchase_order_line)
        for (var j = 0; j < this.purchase_order_line.length; j++) {
          console.log('Upload ',this.uploadedData[i].Barcode)
          console.log('PO',this.purchase_order_line[j].barcode)
          if (this.uploadedData[i].Barcode == this.purchase_order_line[j].barcode) {
            const json = {
              invoice_no: this.uploadedData[i].InvoiceNo,
              vendor_no: this.uploadedData[i].VendorNo,
              po_number: this.uploadedData[i].PONumber,
              box_no: this.uploadedData[i].BoxNo,
              barcode: this.uploadedData[i].Barcode,
              quantity: this.uploadedData[i].Quantity,
            }
            console.log(json)
            this.sendPackingListModels.push(json);
            verifyMid = true;
            if (parseInt(this.uploadedData[i].Quantity) <= this.purchase_order_line[j].barcodePrinted) {
              verifyQuantity = true;
            }
            break;
          }
        }
        if (verifyMid == false) {
          this.spinner.hide();
          validate_excel = true;
          this._toasterService.onError('error', 'Row ' + (i + 1) + ' Barcode :-' + this.uploadedData[i].Barcode + ' Not Match of This PO ' + this.sel_purchase_no.value);
          break;
        } else if (verifyMid == true && verifyQuantity == false) {
          this.spinner.hide();
          validate_excel = true;
          this._toasterService.onError('error', 'Row ' + (i + 1) + ' Barcode :-' + this.uploadedData[i].Barcode + ' Quantity is Greater with PO ' + this.sel_purchase_no.value + ' Quantity ');
          break;
        }
      }
        // else{
        //   this.spinner.hide();
        //   validate_excel = true;
        //   this._toasterService.onError('error','Please Select Po No. Again...');
        //   break;
        // }
    }
    if (validate_excel == false) {
      this.WebApiHttp.Post(this.WebApiHttp.ApiURLArray.packing_list_upload, this.sendPackingListModels).then(result => {
        console.log(result);
        if (result[0].condition.toUpperCase() == 'TRUE') {
          this.progressValue = 0;
          this.headerArray = [];
          this.uploadedData = [];
          this.validateUploadorNot = false;
          this.sel_purchase_no.setValue('');
          this.removeAllFileData();
          this._toasterService.onSuccess('success', 'Excel Uploaded...');
        } else {
          this._toasterService.onError('error', result[0].Message);
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
    }
  }
}

interface ExcelModel {
  InvoiceNo: string;
  VendorNo: string;
  PONumber: string;
  BoxNo: string;
  Barcode: string;
  Quantity: string;
}

interface SendPackingListModel {
  invoice_no: string,
  vendor_no: string,
  po_number: string,
  box_no: string,
  barcode: string,
  quantity: string,
}


