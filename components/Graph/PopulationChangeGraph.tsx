/** @jsxImportSource @emotion/react */
import { theme } from "@/app/theme/theme";
import { ChangesPopulation } from "@/types/Response";
import { css } from "@emotion/react";
import { Line } from "react-chartjs-2";

type Props = {
  changesPopulation: ChangesPopulation[];
};
const PopulationChangeGraph = ({ changesPopulation }: Props) => {
  const labels = changesPopulation.map((item) => `${item.year}年`);
  const populationData = changesPopulation.map((item) => item.population);
  const data = {
    labels,
    datasets: [
      {
        label: "人口（千人）",
        data: populationData,
        backgroundColor: theme.palette.primary.light,
        borderColor: "rgba(66, 165, 245,0.6)",
      },
    ],
  };
  const style = css`
    widht: 100%;
    height: 600px;
  `;

  return (
    <div css={style}>
      <Line data={data} />
    </div>
  );
};

export default PopulationChangeGraph;
