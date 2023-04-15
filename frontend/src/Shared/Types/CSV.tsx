import { dataType } from "./Table";

export type csvLine = (string | null | undefined)[];

export type csvGenerator = (rows: dataType[]) => csvLine[];
