import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import HistoryTable from "../components/HistoryTable";
import { GetHistorysResp } from "../types/history/GetHistorysResp";
import { History } from "../types/history/History";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";

export default function HistoryPage() {
  const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
  const [historyList, setHistoryList] = useState<History[]>([]);

  useEffect(() => {
    getHistorys();
  }, []);

  const getHistorys = (): void => {
    useCaseFactory
      .getHistorys()
      .execute()
      .subscribe({
        next: (response: GetHistorysResp) => {
          if (response.errorSchema.errorCode === 200) {
            setHistoryList(response.outputSchema);
          }
        },
      });
  };

  return (
    <Box p={5}>
      <HistoryTable historyList={historyList} />
    </Box>
  );
}
