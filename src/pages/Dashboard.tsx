import { Modal, Paper, SxProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ActionBox from "../components/ActionBox";
import BorrowKeyForm from "../components/form/BorrowKey";
import CountCard from "../components/CountCard";
import HistoryTable from "../components/HistoryTable";
import KeyCheck from "../components/KeyCheck";
import KeyTable from "../components/KeyTable";
import ReturnKeyForm from "../components/form/ReturnKey";
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
import { User } from "../types/user/User";

const modalStyle: SxProps = {
    position: "absolute",
    borderRadius: 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    boxShadow: 24,
    p: 2,
};

export default function DashboardPage() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const user: User = useCaseFactory.user().get();
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
    const [actionType, setActionType] = useState<
        "Borrow" | "Return" | undefined
    >(undefined);

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
                        setHistoryList([
                            ...historyList,
                            ...response.outputSchema,
                        ]);
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
                        const newHistoryList: History[] = historyList.map(
                            (history) => {
                                const replaceHistory: History | undefined =
                                    response.outputSchema.find(
                                        (history2) => history.id === history2.id
                                    );
                                if (replaceHistory) {
                                    return replaceHistory;
                                }
                                return history;
                            }
                        );
                        setHistoryList(newHistoryList);
                    }
                },
            });
    };

    return (
        <Box p={5}>
            <Typography fontSize={35} mb={2}>
                Dashboard
            </Typography>
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
                        historyList.filter(
                            (history) => history.status === "Inactive"
                        ).length
                    }
                    text="Historys"
                    click={() => setModalHistorys(true)}
                />
                <CountCard
                    count={
                        historyList.filter(
                            (history) => history.status === "Active"
                        ).length
                    }
                    text="Unavailable Keys"
                    click={() => setModalUnavailableKeys(true)}
                />
            </Box>
            {user.role === "Security Operation Center" ? (
                <Box display={"flex"} flexGrow={0} gap={4} mt={4}>
                    <KeyCheck keyList={keyList} />
                    <ActionBox
                        picList={picList}
                        selectedPic={(pic: Pic) => setSelectedPic(pic)}
                        setActionType={(
                            actionType: "Borrow" | "Return" | undefined
                        ) => setActionType(actionType)}
                    />
                </Box>
            ) : (
                <></>
            )}
            <Modal
                open={modalTotalKeys}
                onClose={() => setModalTotalKeys(false)}
            >
                <Paper sx={{ ...modalStyle }}>
                    <KeyTable keyList={keyList} />
                </Paper>
            </Modal>
            <Modal open={modalMainKeys} onClose={() => setModalMainKeys(false)}>
                <Paper sx={{ ...modalStyle }}>
                    <KeyTable
                        keyList={keyList.filter((key) => key.type === "Main")}
                    />
                </Paper>
            </Modal>
            <Modal open={modalHistory} onClose={() => setModalHistorys(false)}>
                <Paper sx={{ ...modalStyle }}>
                    <HistoryTable
                        historyList={historyList.filter(
                            (history) => history.status === "Inactive"
                        )}
                    />
                </Paper>
            </Modal>
            <Modal
                open={modalUnavailableKeys}
                onClose={() => setModalUnavailableKeys(false)}
            >
                <Paper sx={{ ...modalStyle }}>
                    <HistoryTable
                        historyList={historyList.filter(
                            (history) => history.status === "Active"
                        )}
                    />
                </Paper>
            </Modal>
            <Modal
                open={actionType === "Borrow"}
                onClose={() => setActionType(undefined)}
            >
                <Paper sx={{ ...modalStyle }}>
                    <BorrowKeyForm
                        keyList={keyList.filter((key) => key.type === "Main")}
                        unavailableKey={historyList
                            .filter((history) => history.status === "Active")
                            .map((history) => history.key)}
                        selectedPic={selectedPic}
                        borrowKey={borrowKey}
                        onClose={() => setActionType(undefined)}
                    />
                </Paper>
            </Modal>
            <Modal
                open={actionType === "Return"}
                onClose={() => setActionType(undefined)}
            >
                <Paper sx={{ ...modalStyle }}>
                    <ReturnKeyForm
                        keyList={keyList}
                        selectedPic={selectedPic}
                        historyList={historyList.filter(
                            (history) => history.status === "Active"
                        )}
                        returnKey={returnKey}
                        onClose={() => setActionType(undefined)}
                    />
                </Paper>
            </Modal>
        </Box>
    );
}
