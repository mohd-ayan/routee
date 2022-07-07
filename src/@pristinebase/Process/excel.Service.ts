import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

    constructor() {
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        /*const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        console.log('worksheet',worksheet);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);*/
        this.downloadFileInCsv(json, excelFileName);
    }

    public downloadFileInCsv(data: any[], filename: string) {
        const replacer = (key, value) => value === null ? '' : value;
        const header = Object.keys(data[0]);
        let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');
        var blob = new Blob([csvArray], {type: 'text/csv;charset=UTF-8'});
        FileSaver.saveAs(blob, filename + new Date().getTime() + ".csv");
    }

    public exportAsExcelBin_BlockBin(block_in_Bin: any[], pending_to_scan: any[], single_Pending_to_Scan: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(block_in_Bin);
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(pending_to_scan);
        const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(single_Pending_to_Scan);
        //console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = {
            Sheets: {
                'block_in_Bin': worksheet,
                'pending_to_scan': worksheet1,
                'single_Pending_to_Scan': worksheet2
            }, SheetNames: ['block_in_Bin', 'pending_to_scan', 'single_Pending_to_Scan']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    public exportAsSaleHeaderSaleLine(sale_header: any[], sale_Line: any[], pick_lines: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sale_header);
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sale_Line);
        const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(pick_lines);
        //console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = {
            Sheets: {
                'sale_header': worksheet,
                'sale_Line': worksheet1,
                'pick_lines': worksheet2,
            }, SheetNames: ['sale_header', 'sale_Line', 'pick_lines']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    public exportAsSaleHeaderManifest(menifestdata: any[], postedmenifestdata: any, excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(menifestdata);
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(postedmenifestdata.table);
        const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(postedmenifestdata.table1);
        const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(postedmenifestdata.table2);
        const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(postedmenifestdata.table3);
        const workbook: XLSX.WorkBook = {
            Sheets: {
                'CurrentManifestData': worksheet,
                'Pending for Post': worksheet1,
                'Pending for Sorting': worksheet2,
                'Pending for Handover': worksheet3,
                'Hold Orders': worksheet4
            }, SheetNames: ['Pending for Sorting', 'Pending for Post', 'Pending for Handover', 'CurrentManifestData','Hold Orders']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    public saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    public exportAsSlotInfoReport(Barcode_needed_toConsolidate: any[], Single_pending_for_OQC: any[], Wrong_MRP: any[], barcode_inslot: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Barcode_needed_toConsolidate);
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Single_pending_for_OQC);
        const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Wrong_MRP);
        const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(barcode_inslot);
        //console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = {
            Sheets: {
                'Barcode_needed_to_Consolidate': worksheet,
                'Single_pending_for_OQC': worksheet1,
                'Wrong_MRP_barcode': worksheet2,
                'Barcode_In_the_slot': worksheet3
            },
            SheetNames: ['Barcode_needed_to_Consolidate', 'Single_pending_for_OQC', 'Wrong_MRP_barcode', 'Barcode_In_the_slot']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    public exportAstwoCSV(data1: any[], data2: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data1);
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data2);

        const workbook: XLSX.WorkBook = {
            Sheets: {
                'Summary': worksheet,
                'Pending': worksheet1,
            }, SheetNames: ['Summary', 'Pending']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }


    public exportAsPendingReport(data: any, excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.table);
        const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.table1);
        const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.table2);
        const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.table3);
        const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.table4);
        const worksheet5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.table5);
        //console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = {
            Sheets: {
                'Pick_pending': worksheet,
                'Sorting_pending': worksheet1,
                'OQC_pending': worksheet2,
                'Manifest_sorting_pending': worksheet3,
                'Manifest_posting_pending': worksheet4,
                'Manifest_handover_pending': worksheet5,
            }, SheetNames: ['Pick_pending', 'Sorting_pending',
                'OQC_pending', 'Manifest_sorting_pending', 'Manifest_posting_pending', 'Manifest_handover_pending']
        };
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

}
