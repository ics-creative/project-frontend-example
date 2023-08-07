import { PrefCheckList } from "./Filter";

/**
 * 地域ごとに都道府県をまとめたオブジェクトの配列を生成します。
 */
export const generateRegionTree = (regionCheckList: PrefCheckList[]) => {
  // 地域名のリストです
  const regionList = [...new Set(regionCheckList.map(({ region }) => region))];

  // 地域ごとに都道府県をまとめたオブジェクトの配列です。表示のために使用します。
  return regionList.map((region) => {
    const prefList = regionCheckList.filter((pref) => pref.region === region);
    return {
      region,
      prefList,
    };
  });
};
