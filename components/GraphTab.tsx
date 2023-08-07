import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyntheticEvent } from "react";
import { TabState } from "@/types/TabState";

type Props = {
  onChange: (e: SyntheticEvent, newValue: TabState) => void;
  value: number;
};

const GraphTab = ({ onChange, value }: Props) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={onChange}>
        <Tab label="都道府県別人口" />
        <Tab label="都道府県別人口密度" />
        <Tab label="5年間の人口増減数" />
        <Tab label="日本の全人口推移" />
      </Tabs>
    </Box>
  );
};

export default GraphTab;
