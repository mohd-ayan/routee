export class DashboardDataModel {
    condition: boolean;
    pending_po_order: number;
    po_report_ready_for_download: number;
    pending_packing_list_gate_entry: number;
}

export class VendorActivityLog{
    condition: boolean;
    id: number;
    vendor_code: string
    title: string
    description: string
    created_on : string
}
