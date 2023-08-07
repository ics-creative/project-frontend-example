import { ChangesPopulation, PrefPopulation } from "@/types/Response";
import { useEffect, useRef, useState } from "react";

/**
 * JSONデータをフェッチします
 */
export const useFetch = () => {
  // 県別の人口データ
  const [prefPopulationList, setPrefPopulationList] = useState<
    PrefPopulation[] | null
  >(null);

  // 総人口数の推移データ
  const [changesPopulationList, setChangesPopulationList] = useState<
    ChangesPopulation[] | null
  >(null);

  // データをキャッシュします
  const cacheRef = useRef<{
    prefPopulationList: PrefPopulation[] | null;
    changesPopulationList: ChangesPopulation[] | null;
  }>({ prefPopulationList: null, changesPopulationList: null });

  useEffect(() => {
    const fetchJsonData = async () => {
      // キャッシュがある場合はキャッシュを返します
      if (
        cacheRef.current.prefPopulationList !== null &&
        cacheRef.current.changesPopulationList !== null
      ) {
        return {
          prefJson: cacheRef.current.prefPopulationList,
          changesJson: cacheRef.current.changesPopulationList,
        };
      }

      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

      const fetchPref = fetch(`${basePath}/json/pref_population.json`);
      const fetchChanges = fetch(`${basePath}/json/changes_population.json`);
      const [prefResult, changesResult] = await Promise.all([
        fetchPref,
        fetchChanges,
      ]);
      const [prefJson, changesJson] = await Promise.all<
        [Promise<PrefPopulation[]>, Promise<ChangesPopulation[]>]
      >([prefResult.json(), changesResult.json()]);
      cacheRef.current = {
        prefPopulationList: prefJson,
        changesPopulationList: changesJson,
      };

      return { prefJson, changesJson };
    };
    (async () => {
      const { prefJson, changesJson } = await fetchJsonData();
      setPrefPopulationList(prefJson);
      setChangesPopulationList(changesJson);
    })();
  }, []);

  return { prefPopulationList, changesPopulationList };
};
