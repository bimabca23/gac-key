import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ActionBox from "../components/ActionBox";
import CountCard from "../components/CountCard";
import KeyCheck from "../components/KeyCheck";
import { GetKeysResp } from "../types/key/GetKeysResp";
import { Key } from "../types/key/Key";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";
import { Modal, SxProps } from "@mui/material";
import KeyTable from "../components/KeyTable";

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

export default function Dashboard() {
  const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
  const [keyList, setKeyList] = useState<Key[]>([]);
  const [modalTotalKeys, setModalTotalKeys] = useState<boolean>(false);
  const [modalMainKeys, setModalMainKeys] = useState<boolean>(false);
  const [modalSpareKeys, setModalSpareKeys] = useState<boolean>(false);
  const [modalUnavailableKeys, setModalUnavailableKeys] =
    useState<boolean>(false);

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
          count={keyList.filter((key) => key.type === "Spare").length}
          text="Spare Keys"
          click={() => setModalSpareKeys(true)}
        />
        <CountCard
          count={keyList.filter((key) => key.status === "Not Available").length}
          text="Unavailable Keys"
          click={() => setModalUnavailableKeys(true)}
        />
      </Box>
      <Box display={"flex"} flexGrow={0} gap={4} mt={4}>
        <KeyCheck keyList={keyList} />
        <ActionBox />
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
      <Modal open={modalSpareKeys} onClose={() => setModalSpareKeys(false)}>
        <Box sx={{ ...modalStyle }}>
          <KeyTable keyList={keyList.filter((key) => key.type === "Spare")} />
        </Box>
      </Modal>
      <Modal
        open={modalUnavailableKeys}
        onClose={() => setModalUnavailableKeys(false)}
      >
        <Box sx={{ ...modalStyle }}>
          <KeyTable
            keyList={keyList.filter((key) => key.status === "Not Available")}
          />
        </Box>
      </Modal>
    </Box>
  );
}
