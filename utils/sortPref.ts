import { PrefPopulation } from "@/types/Response";
import { GridSortCellParams } from "@mui/x-data-grid";

/**
 * 都道府県のid順にソートするための評価関数です
 */
export const sortPrefId = (
  v1: string,
  v2: string,
  param1: GridSortCellParams<PrefPopulation>,
  param2: GridSortCellParams<PrefPopulation>
) => {
  return (param1.id as number) - (param2.id as number);
};
