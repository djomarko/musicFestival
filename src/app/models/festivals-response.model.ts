interface Band {
  name: string;
  recordLabel?: string;
}

export interface FestivalResponse {
  name?: string;
  bands?: Band[];
}
