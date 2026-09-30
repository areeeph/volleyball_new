export type District = {
  id: string;
  name: string;
};

export type Premise = {
  id: string;
  sequenceId: number;
  name: string;
  address?: string;
  number?: string;
  district: District;
  premiseType: string;
  contact_person?: string;
  contact_number?: string;
  location?: string;
  occupants?: number;
  status?: "active" | "inactive";
  remarks?: string;
};

export type WasteCategory = {
  id: string;
  sequenceId: number;
  name: string;
  parentCategory?: WasteCategory;
  status?: "active" | "inactive";
};

export type Schedule = {
  id: string;
  sequenceId: number;
  category: WasteCategory;
  days: string[];
  asRequired: boolean;
};
