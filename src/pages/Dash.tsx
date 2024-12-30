import Box from "@mui/material/Box";
import ActionBox from "../components/ActionBox";
import CountCard from "../components/CountCard";
import KeyCheck from "../components/KeyCheck";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";
import { useEffect, useState } from "react";
import { GetKeysResp } from "../types/key/GetKeysResp";
import { Key } from "../types/key/Key";

export default function Dashboard() {
  const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
  const [keyList, setKeyList] = useState<Key[]>([]);

  useEffect(() => {
    getKeys();
  }, []);

  const getKeys = (): void => {
    useCaseFactory
      .getKeys()
      .execute()
      .subscribe({
        next: (response: GetKeysResp) => {
          if (response.errorSchema.errorCode === 200) {
            setKeyList(response.outputSchema);
          }
        },
      });
  };

  return (
    <Box p={5}>
      <Box display={"flex"} flexGrow={0} gap={4}>
        <CountCard count={keyList.length} text="Total Keys" />
        <CountCard
          count={keyList.filter((key) => key.type === "Main").length}
          text="Main Keys"
        />
        <CountCard
          count={keyList.filter((key) => key.type === "Spare").length}
          text="Spare Keys"
        />
        <CountCard
          count={keyList.filter((key) => key.status === "Not Available").length}
          text="Unavailable Keys"
        />
      </Box>
      <Box display={"flex"} flexGrow={0} gap={4} mt={4}>
        <KeyCheck />
        <ActionBox />
      </Box>
    </Box>
  );
}
