import { Box } from "@mui/material";
import CountCard from "../Components/CountCard";

export default function Pages() {
  return (
    <Box p={5}>
      <Box display={"flex"} flexGrow={0} gap={3}>
        <CountCard count="975" text="Main Keys" />
        <CountCard count="850" text="Spare Keys" />
        <CountCard count="20" text="Access Cards" />
        <CountCard count="15" text="Unavailable Keys" />
      </Box>
    </Box>
  );
}
