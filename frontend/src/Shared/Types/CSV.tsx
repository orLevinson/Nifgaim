import { dataType } from "./Table";

export type csvLine = (string | null)[];

export type csvGenerator = (rows: dataType[]) => csvLine[];
