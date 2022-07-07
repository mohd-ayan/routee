export class ForceAssignmentModel {
    pick_no: string;
    pick_zone: string;
    total_bin: number;
    total_qty_needed_to_pick: number;
    distribution: number;
    selectedPicker: Array<string>;
    picker: Array<{ picker_id: string; }>;
    openSelect: boolean;

    addbutton: boolean = false;
}
