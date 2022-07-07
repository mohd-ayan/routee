export class ShippingOrderModel {
    condition: string;
    code: string;
    name: string
}

export class CreateManifestModel {
    manifest_Data: Array<{
        condition: string;
        manifest_no: string;
        mani_header_created_by: string;
        mani_header_created_on: string;
        sub_manifest_no: string;
        sub_manifest_line_no: number;
        ship_agent_code: string;
        web_order_no: string;
        awb_no: string;
        no_of_shipment: number;
        total_shipment: number;
    }>;
    manifest_Ship_Data: Array<{
        condition: string;
        manifest_no: string;
        ship_agent_code: string;
        no_of_shipment: number;
    }>

}

export interface manifestDataModel {
    condition: string;
    manifest_no: string;
    mani_header_created_by: string;
    mani_header_created_on: string;
    sub_manifest_no: string;
    sub_manifest_line_no: number;
    ship_agent_code: string;
    web_order_no: string;
    awb_no: string;
    no_of_shipment: number;
    total_shipment: number;


    cancelled:  string;
    hold:  string;
    mark_if_cancel_and_hold:boolean;

}

export interface manifest_Ship_DataModel {
    condition: string;
    manifest_no: string;
    ship_agent_code: string;
    no_of_shipment: number;
}

export interface PendingShippingManifestNo {
    sub_manifest_no: string;
    ship_agent_code: string;
    pending_ship_agent: number;
    select: string;
}

export class HandoverLineModel {
    condition: string;
    manifest_no: string;
    sub_manifest_no: string;
    sub_manifest_line_no: number;
    web_order_no: string;
    ship_agent_code: string;
    awb_no: string;
    posted: number;
    created_by: string;
    created_on: string;
    selected_item: number;
    marketplace_shipment_partner: string;
    maketplace_order_id: string;
    select_byuser: boolean;
    cancelled:string;
    hold:string;
}

export class createHandoverData {
    manifest_no: string;
    sub_manifest_no: string;
    sub_manifest_line_no: number;
    web_order_no: string;
    awb_no: string;
    ship_agent_code: string;
    created_by: string;
    vehicle_no: string;
}
