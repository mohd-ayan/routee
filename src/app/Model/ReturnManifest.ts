export  class sellerModel{
    seller_name: string
    seller_code: string
}

export  class returnManifestHeader{
    condition: string
    return_manifest_no: string
    return_sub_manifest_no: string
    seller_code: string
    posted: string
    total_count:string
    created_by: string
    created_on: string
}
export  class returnManifestLine{
    return_manifest_no: string
    return_sub_manifest_no: string
    zivame_order_no: string
    seller_item_sku: string
    zivame_barcode: string
    awb: string
    return_id: string
    qty: number
}

export class returnPpmpHandoverLines{
    condition:string
    created_by:string
    manifest_date:string
    operating_model:string
    return_manifest_no:string
    return_sub_manifest_no:string
    return_type:string
    seller_code:string
    seller_name:string
}
