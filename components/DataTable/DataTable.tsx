/** @jsxImportSource @emotion/react */
import { PrefPopulation } from "@/types/Response";
import { commaToNum } from "@/utils/commaToNum";
import { excludeAllfromPref } from "@/utils/excludeAllfromPref";
import { roundToDecimal } from "@/utils/roundToDecimal";
import { separateComma } from "@/utils/separateComma";
import { sortPrefId } from "@/utils/sortPref";
import { css } from "@emotion/react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  prefPopulationList: PrefPopulation[];
};

const DataTable = ({ prefPopulationList }: Props) => {
  const columns: GridColDef[] = [
    {
      field: "prefName",
      headerName: "都道府県",
      width: 240,
      sortComparator: sortPrefId,
    },
    {
      field: "population",
      headerName: "人口（人）",
      headerAlign: "right",
      align: "right",
      width: 180,
      sortComparator: (v1, v2) => {
        return commaToNum(v1) - commaToNum(v2);
      },
    },
    {
      field: "populationDensity",
      headerName: "人口密度（人/km²）",
      headerAlign: "right",
      align: "right",
      width: 180,
    },
    {
      field: "populationIncrease",
      headerName: "5年間の人口増減数（人）",
      headerAlign: "right",
      align: "right",
      width: 200,
      sortComparator: (v1, v2) => {
        return commaToNum(v1) - commaToNum(v2);
      },
    },
    {
      field: "populationIncreaseRatio",
      headerName: "5年間の人口増減率（%）",
      headerAlign: "right",
      align: "right",
      width: 200,
    },
  ];

  const exceptAll = excludeAllfromPref(prefPopulationList);

  const rows = exceptAll.map(
    ({
      prefCode,
      prefName,
      population,
      populationDensity,
      populationIncrease,
      populationIncreaseRatio,
    }) => {
      return {
        id: prefCode,
        population: separateComma(population),
        prefName,
        populationDensity,
        populationIncrease: separateComma(populationIncrease),
        populationIncreaseRatio: roundToDecimal(populationIncreaseRatio, 2),
      };
    }
  );
  const style = css`
    width: 100%;
    height: 600px;
    .MuiDataGrid-columnHeaders {
      background-color: rgba(66, 165, 245, 0.12);
    }
  `;

  return (
    <div css={style}>
      <DataGrid
        rows={rows}
        columns={columns}
        sortingOrder={["desc", "asc"]}
        hideFooter
      />
    </div>
  );
};

export default DataTable;
