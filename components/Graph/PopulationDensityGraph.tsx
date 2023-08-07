/** @jsxImportSource @emotion/react */
import { theme } from "@/app/theme/theme";
import { PrefPopulation } from "@/types/Response";
import { excludeAllfromPref } from "@/utils/excludeAllfromPref";
import { css } from "@emotion/react";
import { UpdateMode } from "chart.js";
import { Bar } from "react-chartjs-2";

type Props = {
  prefPopulationList: PrefPopulation[];
  updateMode: UpdateMode;
};

const PopulationDensityGraph = ({ prefPopulationList, updateMode }: Props) => {
  const exceptAll = excludeAllfromPref(prefPopulationList);
  const labels = exceptAll.map((pref) => pref.prefName);
  const densityData = exceptAll.map((pref) => pref.populationDensity);
  const data = {
    labels,
    datasets: [
      {
        label: "人口密度",
        data: densityData,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    scales: {
      x: {
        title: {
          display: true,
          text: "単位：人/km²",
          align: "end" as const,
        },
      },
    },
  };

  const style = css`
    width: 100%;
    height: 1200px;
  `;
  return (
    <div css={style}>
      <Bar options={options} data={data} updateMode={updateMode} />
    </div>
  );
};

export default PopulationDensityGraph;
