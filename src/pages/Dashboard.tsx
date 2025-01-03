import { Modal, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ActionBox from "../components/ActionBox";
import BorrowForm from "../components/BorrowForm";
import CountCard from "../components/CountCard";
import HistoryTable from "../components/HistoryTable";
import KeyCheck from "../components/KeyCheck";
import KeyTable from "../components/KeyTable";
import ReturnForm from "../components/ReturnForm";
import { BorrowReq } from "../types/borrow/BorrowReq";
import { BorrowResp } from "../types/borrow/BorrowResp";
import { GetHistorysResp } from "../types/history/GetHistorysResp";
import { History } from "../types/history/History";
import { GetKeysResp } from "../types/key/GetKeysResp";
import { Key } from "../types/key/Key";
import { GetPicsResp } from "../types/pic/GetPicsResp";
import { Pic } from "../types/pic/Pic";
import { ReturnReq } from "../types/return/ReturnReq";
import { ReturnResp } from "../types/return/ReturnResp";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";

const modalStyle: SxProps = {
  position: "absolute",
  borderRadius: 1,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  background: "white",
  boxShadow: 24,
  p: 2,
};

export default function DashboardPage() {
  const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
  const [keyList, setKeyList] = useState<Key[]>([]);
  const [historyList, setHistoryList] = useState<History[]>([]);
  const [picList, setPicList] = useState<Pic[]>([]);
  const [modalTotalKeys, setModalTotalKeys] = useState<boolean>(false);
  const [modalMainKeys, setModalMainKeys] = useState<boolean>(false);
  const [modalHistory, setModalHistorys] = useState<boolean>(false);
  const [modalUnavailableKeys, setModalUnavailableKeys] =
    useState<boolean>(false);
  const [selectedPic, setSelectedPic] = useState<Pic>({
    id: 0,
    rfid: "",
    name: "",
    initial: "",
  });
  const [actionType, setActionType] = useState<"Borrow" | "Return" | undefined>(
    undefined
  );

  useEffect(() => {
    getKeys();
    getHistorys();
    getPics();
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

  const getPics = (): void => {
    useCaseFactory
      .getPics()
      .execute()
      .subscribe({
        next: (response: GetPicsResp) => {
          if (response.errorSchema.errorCode === 200) {
            setPicList(response.outputSchema);
          }
        },
      });
  };

  const borrowKey = (request: BorrowReq): void => {
    useCaseFactory
      .borrow()
      .execute(request)
      .subscribe({
        next: (response: BorrowResp) => {
          if (response.errorSchema.errorCode === 200) {
            setActionType(undefined);
            setHistoryList([...historyList, ...response.outputSchema]);
          }
        },
      });
  };

  const returnKey = (request: ReturnReq): void => {
    useCaseFactory
      .return()
      .execute(request)
      .subscribe({
        next: (response: ReturnResp) => {
          if (response.errorSchema.errorCode === 200) {
            setActionType(undefined);
            const newHistoryList: History[] = historyList.map((history) => {
              const replaceHistory: History | undefined =
                response.outputSchema.find(
                  (history2) => history.id === history2.id
                );
              if (replaceHistory) {
                return replaceHistory;
              }
              return history;
            });
            setHistoryList(newHistoryList);
          }
        },
      });
  };

  return (
    <Box p={5}>
      <Box display={"flex"} flexGrow={0} gap={4}>
        <CountCard
          count={keyList.length}
          text="Total Keys"
          click={() => setModalTotalKeys(true)}
        />
        <CountCard
          count={keyList.filter((key) => key.type === "Main").length}
          text="Main Keys"
          click={() => setModalMainKeys(true)}
        />
        <CountCard
          count={
            historyList.filter((history) => history.status === "Inactive")
              .length
          }
          text="Historys"
          click={() => setModalHistorys(true)}
        />
        <CountCard
          count={
            historyList.filter((history) => history.status === "Active").length
          }
          text="Unavailable Keys"
          click={() => setModalUnavailableKeys(true)}
        />
      </Box>
      <Box display={"flex"} flexGrow={0} gap={4} mt={4}>
        <KeyCheck keyList={keyList} />
        <ActionBox
          picList={picList}
          selectedPic={(pic: Pic) => setSelectedPic(pic)}
          setActionType={(actionType: "Borrow" | "Return" | undefined) =>
            setActionType(actionType)
          }
        />
      </Box>
      <Modal open={modalTotalKeys} onClose={() => setModalTotalKeys(false)}>
        <Box sx={{ ...modalStyle }}>
          <KeyTable keyList={keyList} />
        </Box>
      </Modal>
      <Modal open={modalMainKeys} onClose={() => setModalMainKeys(false)}>
        <Box sx={{ ...modalStyle }}>
          <KeyTable keyList={keyList.filter((key) => key.type === "Main")} />
        </Box>
      </Modal>
      <Modal open={modalHistory} onClose={() => setModalHistorys(false)}>
        <Box sx={{ ...modalStyle }}>
          <HistoryTable
            historyList={historyList.filter(
              (history) => history.status === "Inactive"
            )}
          />
        </Box>
      </Modal>
      <Modal
        open={modalUnavailableKeys}
        onClose={() => setModalUnavailableKeys(false)}
      >
        <Box sx={{ ...modalStyle }}>
          <HistoryTable
            historyList={historyList.filter(
              (history) => history.status === "Active"
            )}
          />
        </Box>
      </Modal>
      <Modal
        open={actionType === "Borrow"}
        onClose={() => setActionType(undefined)}
      >
        <Box sx={{ ...modalStyle }}>
          <BorrowForm
            keyList={keyList}
            selectedPic={selectedPic}
            borrowKey={borrowKey}
            onClose={() => setActionType(undefined)}
          />
        </Box>
      </Modal>
      <Modal
        open={actionType === "Return"}
        onClose={() => setActionType(undefined)}
      >
        <Box sx={{ ...modalStyle }}>
          <ReturnForm
            keyList={keyList}
            selectedPic={selectedPic}
            historyList={historyList.filter(
              (history) => history.status === "Active"
            )}
            returnKey={returnKey}
            onClose={() => setActionType(undefined)}
          />
        </Box>
      </Modal>
    </Box>
  );
}
