/**
 * 人口推移APIレスポンスの型定義
 */
export type ChangesPopulation = { year: number; population: number };

/**
 * 都道府県別人口APIレスポンスの型定義
 */
export type PrefPopulation = {
  id: number;
  prefCode: string;
  region: string;
  prefName: string;
  population: number;
  populationDensity: number;
  populationIncrease: number;
  populationIncreaseRatio: number;
};
