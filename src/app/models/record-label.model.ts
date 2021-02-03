export interface Festivals {
  [name: string]: {
    name: string;
  };
}

export interface Bands {
  [name: string]: {
    name: string;
    festivals: Festivals;
  };
}

export interface RecordLabels {
  [name: string]: {
    name: string;
    bands: Bands;
  };
}
