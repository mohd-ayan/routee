export class CageMasterModel {
    condition: string;
    cage_id: string;
    consolidation_zone: string;
    pick_no: string;
    marketplace_name: string;
    cage_status: string;
}

export class CageZoneList {
    condition: string;
    zone: string;
}

export class AddCageModel {
    condition: boolean;
    inputfield: string;
    selectField: string;
}
