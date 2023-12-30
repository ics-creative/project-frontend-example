/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import DataTable from "@/components/DataTable/DataTable";
import Filter from "@/components/Filter/Filter";
import PopulationChangeGraph from "@/components/Graph/PopulationChangeGraph";
import PopulationDensityGraph from "@/components/Graph/PopulationDensityGraph";
import PrefPopulationGraph from "@/components/Graph/PrefPopulationGraph";
import { useFetch } from "@/hooks/useFetch";
import { PrefPopulation } from "@/types/Response";
import {
  AppBar,
  Box,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  colors,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  UpdateMode,
} from "chart.js";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import GraphTab from "@/components/GraphTab";
import { TAB_NAME, TabState } from "@/types/TabState";
import { theme } from "./theme/theme";
import PrefPopulationIncreaseGraph from "@/components/Graph/PrefPopulationIncreaseGraph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController
);

ChartJS.defaults.font.family = theme.typography.fontFamily;

const Page = () => {
  const { prefPopulationList, changesPopulationList } = useFetch();
  const [filteredPrefList, setFilteredPrefList] = useState<
    PrefPopulation[] | null
  >(prefPopulationList);

  useEffect(() => {
    setFilteredPrefList(prefPopulationList);
  }, [prefPopulationList]);

  const [tabValue, setTabValue] = useState<TabState>(TAB_NAME.Population);

  const [chartUpdateMode, setChartUpdateMode] = useState<UpdateMode>("none");

  /**
   * タブの切り替え
   * @param event
   * @param newValue
   */
  const handleTabChange = (_: SyntheticEvent, newValue: TabState) => {
    setTabValue(newValue);
    setChartUpdateMode("show");
  };

  // チェックボックスの状態が変更されたときに呼ばれる関数です
  const handleFilter = useCallback(
    (filteredPref: PrefPopulation[]) => {
      setFilteredPrefList(filteredPref);
      setChartUpdateMode("active");
    },
    [setFilteredPrefList]
  );

  const yearElement = useRef<HTMLElement>(null);
  if (yearElement.current) {
    const date = new Date();
    const year = date.getFullYear();
    yearElement.current.textContent = String(year);
  }

  const layoutStyle = (tabValue: TabState) => css`
    display: grid;
    width: 100%;
    padding: 40px 64px;
    gap: 24px 40px;
    grid-template: ${tabValue === TAB_NAME.Changes
      ? '"graph graph" auto "table table" auto / calc(100% - 464px) 424px'
      : '"graph filter" auto "table table" auto / calc(100% - 464px) 424px'};
  `;

  const graphStyle = css`
    grid-area: graph;
  `;

  const filterStyle = css`
    grid-area: filter;
    align-self: stretch;
  `;

  const tableStyle = css`
    grid-area: table;
  `;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" sx={{ p: 1 }}>
          <Toolbar>
            <Typography variant="h1" component="h1">
              日本の都道府県別人口データ
            </Typography>
          </Toolbar>
        </AppBar>

        <div css={layoutStyle(tabValue)}>
          <Paper css={graphStyle}>
            <Box sx={{ p: 2 }}>
              <Typography
                variant="h2"
                component="h2"
                color="primary"
                sx={{ py: 1 }}
              >
                グラフ
              </Typography>
              <GraphTab onChange={handleTabChange} value={tabValue} />
              {filteredPrefList && (
                <>
                  {tabValue === TAB_NAME.Population && (
                    <PrefPopulationGraph
                      prefPopulationList={filteredPrefList}
                      updateMode={chartUpdateMode}
                    />
                  )}
                  {tabValue === TAB_NAME.Density && (
                    <PopulationDensityGraph
                      prefPopulationList={filteredPrefList}
                      updateMode={chartUpdateMode}
                    />
                  )}
                  {tabValue === TAB_NAME.Increase && (
                    <PrefPopulationIncreaseGraph
                      prefPopulationList={filteredPrefList}
                      updateMode={chartUpdateMode}
                    />
                  )}
                </>
              )}
              {changesPopulationList && tabValue === TAB_NAME.Changes && (
                <PopulationChangeGraph
                  changesPopulation={changesPopulationList}
                />
              )}
              <div className="source">
                <Typography
                  variant="caption"
                  component="p"
                  align="left"
                  sx={{ pt: 2 }}
                >
                  出典：政府統計の総合窓口(e-Stat)（
                  <a href="https://www.e-stat.go.jp/" target="_blank">
                    https://www.e-stat.go.jp/
                  </a>
                  ）
                </Typography>
              </div>
            </Box>
          </Paper>
          {tabValue !== TAB_NAME.Changes && (
            <div css={filterStyle}>
              <Paper sx={{ height: "100%" }}>
                <Box sx={{ p: 2 }}>
                  {prefPopulationList && (
                    <Filter
                      prefPopulationList={prefPopulationList}
                      onChange={handleFilter}
                    />
                  )}
                </Box>
              </Paper>
            </div>
          )}

          <div css={tableStyle}>
            <Paper>
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h2"
                  component="h2"
                  color="primary"
                  sx={{ pt: 1, pb: 2 }}
                >
                  データ
                </Typography>
                {prefPopulationList && (
                  <DataTable prefPopulationList={prefPopulationList} />
                )}
              </Box>
            </Paper>
          </div>
        </div>

        <Typography
          variant="caption"
          component="p"
          align="center"
          sx={{ pb: 2 }}
        >
          <span ref={yearElement}></span> - example.com
        </Typography>
      </div>
    </ThemeProvider>
  );
};

export default Page;
