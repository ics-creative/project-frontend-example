import { PrefPopulation } from "@/types/Response";

/**
 * 県別のデータから「全国」のデータを除外します
 */
export const excludeAllfromPref = (prefList: PrefPopulation[]) => {
  return prefList.filter((pref) => pref.prefCode !== "00");
};
