import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {
  po_line_barcode,
  View_purchase_order_model
} from "../../../purchase/view-purchase-order/view_purchase_order_model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {PristineToaster} from "../../../../../@pristinebase/Process/ZivameServices/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";
import {ExcelService} from "../../../../../@pristinebase/Process/excel.Service";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.services";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-view-packing-list',
  templateUrl: './view-packing-list.component.html',
  styleUrls: ['./view-packing-list.component.scss'],
})
export class ViewPackingListComponent implements OnInit {

  vendor_no:string;
  dataSource : MatTableDataSource<packingListDetail> = new MatTableDataSource<packingListDetail>([]);
  purchase_order_list: Array<packingListDetail1> = [];
  packing_list: Array<packingListDetail> = [];
  displayColumn: string[] = ["carton_box_number","barcode", "quantity" , "Style", "Color" , "Size" ,"category","mch1", "mch2",
    "mch3" , "status","upload_datetime"]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public WebApiHttp: WebApiHttp,
              private route: ActivatedRoute,
              private configRef:MatDialog,
              public  _encryptdecrypt: EncriptDecript,
              public _toasterService: PristineToaster,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private spinner: NgxSpinnerService,
              private _excelService: ExcelService,) {
    this.packing_list = this.data.packing_list;
  }

  ngOnInit() {
    try{
      this.vendor_no = this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID'));
      this.dataSource = new MatTableDataSource<packingListDetail>(this.packing_list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }catch (e) {
      console.log(e)
    }
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

  //upload image   //upload file
  downloadeskb=0;
  downloadValue = 0;
  totalsizeDowloadFile = 0;

  PrintPacking() {
    var json = {
      Vendor_code: this._encryptdecrypt.decrypt(localStorage.getItem('ZIV_SSID')),
      Packing_List_No: this.packing_list[0].vendor_packing_list_no,
      flag: 'PACKINGLIST_BARCODE'
    };
    this.WebApiHttp.Post_Data_With_DownloadStatus_GetFile(this.WebApiHttp.ApiURLArray.getPackingList, json)
        .subscribe((event: HttpEvent<any>) => {
      try {
        switch (event.type) {
          case HttpEventType.Sent:
            //   console.log('Request started');

            this._toasterService.onInfo('Info', 'Download Started')
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
              FileSaver.saveAs(event.body, this.packing_list[0].vendor_packing_list_no + '_Packing_Barcode.pdf');
              this.configRef.closeAll();
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
        this.spinner.hide();
      }
      this.spinner.hide();
    })
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // @ViewChild('content',{static:true}) divcontent: ElementRef;

//   pdfGenrate() {
//     let content = this.divcontent.nativeElement;
//     let printContents, popupWin;
//     printContents = content.innerHTML;
//     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
//     popupWin.document.open();
//     popupWin.document.write(
//         `<style>
// table{
//     width:100%;
//   }
//   th{
//     padding: 15px 10px;
//     border: 1px solid #ebeff5;
//   }
//   td{
//     padding: 10px;
//     border: 1px solid #ebeff5;
//     //vertical-align:middle;
//    // border-bottom: solid 1px rgba(255,255,255,0.1);
//   }
//   tr:nth-child(even) {background-color: #f5f7fc;}
//   tr:hover {background-color: #e6f3ff;}
//
//          table { page-break-inside:auto }
// tr    { page-break-inside:avoid; page-break-after:auto }
// thead { display:table-header-group }
// tfoot { display:table-footer-group }
//           </style><body onload="window.print();window.close()">${printContents}</body>`
//     );
//     popupWin.document.close();
//   }

  ClosePacking() {
    this.configRef.closeAll();
  }

}


interface packingListDetail {
  condition: string;
  vendor_packing_list_no: string;
  document_number: string;
  vendor_no: string;
  Name:string;
  Address:string;
  Address2:string;
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

interface packingListDetail1 {
  condition: string;
  PackingList_Barcode:string
  Carton_box_number:string
  lines:Array<{
    Carton_box_number: string;
    Invoice_number: string;
    barcode: string;
    document_number: string;
    Quantity: string;
    Upload_datetime: string;
    Vendor_Packing_list_No: string;
    Vendor_code: string;
    status: string;
    pl:Array<
        {
          Style:string;
          Color:string;
          Size:string;
          category:string;
          mch1:string;
          mch2:string;
          mch3:string;
        }
        >
  }>
}

