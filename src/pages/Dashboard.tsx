import Box from "@mui/material/Box";
import ActionBox from "../components/ActionBox";
import CountCard from "../components/CountCard";
import KeyCheck from "../components/KeyCheck";

export default function Pages() {
  return (
    <Box p={5}>
      <Box display={"flex"} flexGrow={0} gap={4}>
        <CountCard count="975" text="Main Keys" />
        <CountCard count="850" text="Spare Keys" />
        <CountCard count="20" text="Access Cards" />
        <CountCard count="15" text="Unavailable Keys" />
      </Box>
      <Box display={"flex"} flexGrow={0} gap={4} mt={4}>
        <KeyCheck />
        <ActionBox />
      </Box>
    </Box>
  );
}
