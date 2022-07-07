export class View_purchase_order_model {
    condition: string
    message:string
    documentType: string
    purchaseOrderNo: string
    lineNo: number
    buyFromVendorNo: string
    itemNo: string
    locationCode: string
    description: string
    description2: string
    style: string
    color: string
    size: string
    barcode: string
    category: string
    unit_of_measure: string
    mrp: number
    mch1: string
    mch2: string
    mch3: string
    quantity: number
    qtyToPrint : number
    rePrint : number
    outstandingQuantity: number
    maxTolerance: number
    customeTolerance: number
    toleranceApplied: number
    barcodePrinted: number
    uI_BarcodePrinted: number
    additionalBarcodePrint: number
    barcodePrintedTolerance: number
    remainingBarcodeWithTolerance: number
    remainingBarcodeWithoutTolerance: number
    created_on: string
    updated_by: string
    updated_on: string
    wherehouse_barcode_qty: number
    warehouse_updated_by: string
    warehouse_updated_on: string
}
export class po_line_barcode {
    purchaseOrderNo:string
    lineNo:number
    barcode:string
    quantityToPrint:number
    mrp:number
}
