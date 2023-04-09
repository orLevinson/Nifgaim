import { Input } from "@mui/material";
import React from "react";
import Fields from "../../Shared/Types/Fields";
import { dataType } from "../../Shared/Types/Table";

// my solution for the expended tab
const ExpandedTab = ({
  data,
  columns,
}: {
  data: dataType;
  columns: Fields[];
}) => {
    // get all the multi attribute columns that needed to be rendered in the expanded tab
  const expandedCols = columns.filter((col) => col.type === "multi-attributes");
  console.log(data);
  return (
    <div>
        {/* for each column */}
      {expandedCols.map((col) => {
        const dataArr: {
          [key: string]: string;
        }[] = data[col.id] as {
          [key: string]: string;
        }[];
        return (
          <p>
            <>
              <h1>{col.name}</h1>
              {/* go over all the data in the row for the given column */}
              {dataArr.map((row) => {
                return (
                  <p>
                    {/* for each child(type of entry in the expanded column) create an input that will have the same value as the data given */}
                    {col.children?.map((entry) => {
                      return <Input value={row[entry.id]} />;
                    })}
                  </p>
                );
              })}
            </>
          </p>
        );
      })}
    </div>
  );
};

export default ExpandedTab;
