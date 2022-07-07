export class WaveWiseZoneModel {
    total_worker: number;
    zone_id: number;
    condition:string;
    pl: Array<{
        pick_no: string;
        pick_priority: string;
        total_bin: number;
        qty_ordered: number;
        active_picker: number;
    }>;
}
