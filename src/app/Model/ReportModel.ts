export class PickInfoReportModel {
    barcode: string;
    bincode: string;
    bincode_id: number;
    condition: boolean;
    consolidation_line_status: number;
    consolidation_order_status: number;
    consolidation_qty: number;
    flush: number;
    is_cancelled: number;
    marketplace: number;
    marketplace_name: string;
    oqc_bad_qty: number;
    oqc_good_qty: number;
    order_no: string;
    order_processed: number;
    pick_create_date: string;
    pick_line_no: string;
    pick_no: string;
    pick_priorty: number;
    pick_status: number;
    pick_zone: string;
    qty_ordered: number;
    qty_picked: number;
    sale_line_no: number;
    sale_no: string;
    shipment_no: string;
    source_document: string;
    message: string;
}

export class BinZoneSeachReportModel {
    condition: boolean;
    id: string;
    bincode: string;
    bin_type: string;
    zone_type: string;
    message: string;
}

export class PickDistributionReportMOdel {
    condition: string;
    id: string;
    pick_person_id: string;
    pick_no: string;
    work_type: string;
    pick_zone: string;
    start_bin: string;
    end_bin: string;
    is_running: string;
    distribution_create_datetime: string;
    zone_enter_datetime: string;
}

export class OQCRangeReportModel {
    condition: string;
    email_id: string;
    zone: string;
    start_slot: string;
    end_slot: string
}
