export class roleDetailModel {
    condition: string;
    role_id: number;
    role_name: string;

}

export class saleInfo {

    condition: string;
    message: string;
    sale_headers: Array<{
        condition: string
        order_no: string
        source_no: string
        order_date: string
        psi_invoice_no: string
        tier: string
        wc: string
        gift_card: string
        ship_agent_code: string
        docket_no: string
        dest_code: string
        ship_name: string
        customer_address: string
        ship_sate: string
        mobile_no: number
        payment_method: string
        shipment_no: string
        zcoin: string
        shipment_amt: number
        cod_charge: string
        order_status: string
        scan_awb: number
        scan_awb_by: string
        scan_awb_on: string
    }>;
    sale_lines: Array<{
        condition: string
        type: string
        source_no: string
        source_line_no: number
        order_no: string
        item_no: string
        hsn_code: string
        pick_quantity: number
        reserved_quantity: number
        picked_qty: number
        sp: string
        gst_percentage: number
        discount_amout: number
        net_amount: number
        cgst_rate: number
        sgst_rate: number
        igst_rate: number
        cgst_amount: number
        sgst_amount: number
        igst_amount: number
        good_qty: number
        is_cancelled: number
    }>;
    pick_lines: Array<any>;
}

export class saleHeaderModel {
    condition: string;
    message: string;
    order_no: string;
    source_no: string;
    order_date: string;
    psi_invoice_no: string;
    tier: string;
    wc: string;
    gift_card: string;
    ship_agent_code: string;
    docket_no: string;
    dest_code: string;
    ship_name: string;
    customer_address: string;
    ship_sate: string;
    mobile_no: number;
    payment_method: string;
    shipment_no: string;
    zcoin: string;
    shipment_amt: number;
    cod_charge: string;
    order_status: string;
    scan_awb: number;
    scan_awb_by: string;
    scan_awb_on: string
}

export class saleLine {
    condition: string;
    message: string;
    type: string;
    source_no: string;
    source_line_no: number;
    order_no: string;
    item_no: string;
    hsn_code: string;
    pick_quantity: number;
    reserved_quantity: number;
    picked_qty: number;
    sp: string;
    gst_percentage: number;
    discount_amout: number;
    net_amount: number;
    cgst_rate: number;
    sgst_rate: number;
    igst_rate: number;
    cgst_amount: number;
    sgst_amount: number;
    igst_amount: number;
    good_qty: number;
    is_cancelled: number
}

export class SetupAllPickModel {
    condition: string;
    message: string;
    min_bin: number
}

export class Rolemodel {
    menu_name: string;
    parent_page_id: string;
    check: boolean;
    children: Array<{
        children_name: string
        page_id: number
        check: number;
    }>;
}

export class RolePermissionDetail {
    menu_name: string;
    parent_page_id: string;
    check: boolean;
    children?: [];
}



