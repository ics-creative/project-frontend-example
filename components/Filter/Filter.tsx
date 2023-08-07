/** @jsxImportSource @emotion/react */
import { PrefPopulation } from "@/types/Response";
import { excludeAllfromPref } from "@/utils/excludeAllfromPref";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";
import { generateRegionTree } from "./generateRegionTree";
import { css } from "@emotion/react";

type Props = {
  prefPopulationList: PrefPopulation[];
  onChange: (filteredPref: PrefPopulation[]) => void;
};

export type PrefCheckList = PrefPopulation & {
  checked: boolean;
};

/**
 * フィルター部分のUIコンポーネントです
 */
const Filter = ({ prefPopulationList, onChange }: Props) => {
  const exceptAll = excludeAllfromPref(prefPopulationList);
  // チェックボックスの状態の管理のため、拡張した人口データの配列です
  const basePrefCheckList = exceptAll.map((pref) => ({
    ...pref,
    checked: true,
  }));

  // チェックボックスの状態を管理するためのstateです
  const [checkedPref, setCheckedPref] =
    useState<PrefCheckList[]>(basePrefCheckList);

  // 地域ごとに都道府県をまとめたオブジェクトの配列です。表示のために使用します。
  const regionTree = generateRegionTree(checkedPref);

  // チェックボックスの状態が変更されたときに呼ばれる関数です
  const handleChange = useCallback(
    (e: SyntheticEvent, prefCode: string) => {
      const prefIndex = checkedPref.findIndex(
        (pref) => pref.prefCode === prefCode
      );
      checkedPref[prefIndex].checked = (e.target as HTMLInputElement).checked;
      setCheckedPref(checkedPref);
      const filteredPref: PrefPopulation[] = checkedPref
        .filter((pref) => pref.checked)
        .map(
          ({
            id,
            prefCode,
            prefName,
            region,
            population,
            populationDensity,
            populationIncrease,
            populationIncreaseRatio,
          }) => ({
            id,
            prefCode,
            prefName,
            region,
            population,
            populationDensity,
            populationIncrease,
            populationIncreaseRatio,
          })
        );
      onChange(filteredPref);
    },
    [checkedPref, onChange]
  );

  const titleStyle = css`
    padding: 24px 0 8px;
  `;

  const boxStyle = css`
    padding: 8px;
  `;
  return (
    <div>
      <div>
        <Typography variant="h2" component="h2" color="primary" sx={{ py: 1 }}>
          フィルタ
        </Typography>
      </div>
      <FormGroup>
        {regionTree.map(({ region, prefList }) => {
          return (
            <div key={region}>
              <div css={titleStyle}>
                <Typography variant="h3" component="h3">
                  {region}
                </Typography>
              </div>

              <div css={boxStyle}>
                {prefList.map((pref) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox />}
                      label={pref.prefName}
                      key={pref.prefCode}
                      checked={pref.checked}
                      onChange={(e) => {
                        handleChange(e, pref.prefCode);
                      }}
                      sx={{
                        ".MuiFormControlLabel-label": { fontSize: "14px" },
                      }}
                    />
                  );
                })}
              </div>

              <Divider />
            </div>
          );
        })}
      </FormGroup>
    </div>
  );
};
export default Filter;
