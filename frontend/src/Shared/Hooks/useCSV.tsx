import React, { useCallback, useContext } from "react";
import DataCtx from "../Context/DataCtx";
import { csvGenerator, csvLine } from "../Types/CSV";

const useCSV = () => {
  const { columns } = useContext(DataCtx);

  const generateBreakPoints: (arr: any[]) => string[] = (arr) => {
    const breakPointsArr: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      breakPointsArr.push("-------------------------------------------");
    }
    return breakPointsArr;
  };

  function isValidDate(value: string) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  function formatDate(value: Date) {
    return `${value.getDate()} / ${
      value.getMonth() + 1
    } / ${value.getFullYear()} `;
  }

  const GenerateCSV: csvGenerator = useCallback(
    (rows) => {
      const generatedRows: csvLine[] = [];
      const headers: csvLine = [];
      const newHeadersFormat: {
        id: string;
        type: string;
        insideOf?: string;
      }[] = [];
      headers.push("מזהה ייחודי");
      headers.push("הרשאות");
      columns.forEach((column) => {
        if (column.type !== "multi-attributes") {
          headers.push(column.name);
          newHeadersFormat.push({ id: column.id, type: column.type });
        } else {
          (column.children && Array.isArray(column.children)
            ? column.children
            : []
          ).forEach((subCol) => {
            newHeadersFormat.push({
              id: subCol.id,
              type: subCol.type,
              insideOf: column.id,
            });
            headers.push(column.name + " - " + subCol.name);
          });
        }
      });
      generatedRows.push(headers);
      const breakPoint = generateBreakPoints(headers);
      generatedRows.push(breakPoint);

      rows.forEach((row) => {
        const rowArrs: csvLine[] = [[]];
        row.perm.split("~").forEach((perm, index) => {
          rowArrs[index] = [index === 0 ? row.id : null, perm];
        });
        newHeadersFormat.forEach((column, index) => {
          const colIndex = index + 2;
          if (row[column.id] && !column.insideOf) {
            if (
              column.type === "date" &&
              row[column.id] &&
              typeof row[column.id] === "string" &&
              isValidDate(row[column.id] as string)
            ) {
              const date = new Date(row[column.id] as string);
              rowArrs[0][colIndex] = formatDate(date);
            } else if (row[column.id] && typeof row[column.id] === "string") {
              rowArrs[0][colIndex] = row[column.id] as string;
            } else {
              rowArrs[0][colIndex] = null;
            }
          } else if (
            column.insideOf &&
            row[column.insideOf] &&
            Array.isArray(row[column.insideOf])
          ) {
            if (row[column.insideOf].length > rowArrs.length) {
              for (
                let i = 0;
                i < row[column.insideOf].length - rowArrs.length;
                i++
              ) {
                rowArrs.push([]);
              }
            }
            (row[column.insideOf] as { [key: string]: string }[]).forEach(
              (entry, entryIndex) => {
                if (
                  column.type === "date" &&
                  entry[column.id] &&
                  typeof entry[column.id] === "string" &&
                  isValidDate(entry[column.id] as string)
                ) {
                  const date = new Date(entry[column.id] as string);
                  rowArrs[entryIndex][colIndex] = formatDate(date);
                } else if (
                  entry[column.id] &&
                  typeof entry[column.id] === "string"
                ) {
                  rowArrs[entryIndex][colIndex] = entry[column.id] as string;
                } else {
                  rowArrs[entryIndex][colIndex] = null;
                }
              }
            );
          }
        });

        generatedRows.push(...rowArrs);
        generatedRows.push(breakPoint);
      });

      return generatedRows;
    },
    [columns]
  );

  return { GenerateCSV };
};

export default useCSV;
