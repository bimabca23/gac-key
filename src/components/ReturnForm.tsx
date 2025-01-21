import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useState } from "react";
import { History } from "../types/history/History";
import { Key } from "../types/key/Key";
import { Pic } from "../types/pic/Pic";
import { ReturnReq } from "../types/return/ReturnReq";
import RfidButton from "./RfidButton";

interface Props {
    keyList: Key[];
    historyList: History[];
    selectedPic: Pic;
    returnKey(request: ReturnReq): void;
    onClose(): void;
}

export default function ReturnForm(props: Props) {
    const [returnReq, setReturnReq] = useState<ReturnReq>({
        initial: props.selectedPic.initial,
        time: moment().add(7, "hours").toISOString(),
        historyIdList: [],
    });
    const [selectedHistory, setSelectedHistory] = useState<History[]>(
        props.historyList.filter((history) => history.status === "Active")
    );
    const [rfid, setRfid] = useState<string>("");
    const [selectedKey, setSelectedKey] = useState<Key>({
        id: 0,
        rfid: "No",
        type: "Main",
        name: "",
        room: "",
        quantity: 0,
        location: "",
    });

    const selectHistory = (rfid: string): void => {
        const newHistory: History[] = selectedHistory.map((history) => {
            if (history.key.rfid === rfid) {
                setSelectedKey(history.key);
                return {
                    ...history,
                    status: "Inactive",
                };
            }
            return history;
        });
        setSelectedHistory(newHistory);
    };

    const isValid = (): boolean => {
        return (
            selectedHistory.filter((history) => history.status === "Inactive")
                .length !== 0
        );
    };

    return (
        <Box>
            <Grid container spacing={2} marginBottom={3}>
                <Grid size={3}>
                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <Typography variant="body1" fontWeight="bold">
                                PIC Detail
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Name
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                : {props.selectedPic.name}
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Initial
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                : {props.selectedPic.initial}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body1" fontWeight="bold">
                                Key Detail
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Type
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                : {selectedKey.id ? selectedKey.type : ""}
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Name
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                : {selectedKey.id ? selectedKey.name : ""}
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Quantity
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                :{" "}
                                {selectedKey.id
                                    ? selectedKey.quantity
                                          .toString()
                                          .concat(" Pcs")
                                    : ""}
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Location
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                : {selectedKey.id ? selectedKey.location : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={9} maxHeight={300} overflow="auto">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        rowSpan={2}
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        rowSpan={2}
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        Pass ID
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        rowSpan={2}
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        Key
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        rowSpan={2}
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        Purpose
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        colSpan={4}
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        Borrow
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        Date
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        Clock
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        PIC
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold", p: 1 }}
                                    >
                                        SOC
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {selectedHistory.length ? (
                                <TableBody>
                                    {selectedHistory.map((history, index) => (
                                        <TableRow
                                            key={history.id}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                                background:
                                                    history.status ===
                                                    "Inactive"
                                                        ? "success.main"
                                                        : "transparent",
                                            }}
                                        >
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {history.passId}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {history.key.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {history.purpose}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {moment(history.borrowTime)
                                                    .utc()
                                                    .format("DD/MM/YY")}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {moment(history.borrowTime)
                                                    .utc()
                                                    .format("HH:mm")}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {history.borrowPic}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    color:
                                                        history.status ===
                                                        "Inactive"
                                                            ? "white"
                                                            : "black",
                                                }}
                                            >
                                                {history.borrowSoc}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell align="center" colSpan={12}>
                                            No Data
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Box>
                <RfidButton
                    rfid={rfid}
                    setRfid={setRfid}
                    onEnter={() => selectHistory(rfid)}
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{ float: "right" }}
                    disabled={!isValid()}
                    onClick={() =>
                        props.returnKey({
                            ...returnReq,
                            historyIdList: selectedHistory
                                .filter(
                                    (history) => history.status === "Inactive"
                                )
                                .map((history) => history.id),
                        })
                    }
                >
                    SAVE
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    color="error"
                    sx={{ float: "right", mr: 3 }}
                    onClick={props.onClose}
                >
                    CANCEL
                </Button>
            </Box>
        </Box>
    );
}
