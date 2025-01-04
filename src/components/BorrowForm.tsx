import {
    Box,
    Button,
    Grid2 as Grid,
    TextField,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { BorrowReq } from "../types/borrow/BorrowReq";
import { Key } from "../types/key/Key";
import { Pic } from "../types/pic/Pic";
import RfidButton from "./RfidButton";

interface Props {
    keyList: Key[];
    selectedPic: Pic;
    borrowKey(request: BorrowReq): void;
    onClose(): void;
}

export default function BorrowForm(props: Props) {
    const [borrowReq, setBorrowReq] = useState<BorrowReq>({
        initial: props.selectedPic.initial,
        passId: "",
        purpose: "",
        time: moment().toISOString(),
        keyList: [],
    });
    const [rfid, setRfid] = useState<string>("");

    const lastKey = (): Key => {
        if (borrowReq.keyList.length) {
            return borrowReq.keyList[borrowReq.keyList.length - 1];
        }
        return {
            id: 0,
            rfid: "No",
            type: "Main",
            name: "",
            quantity: 0,
            location: "",
        };
    };

    const selectKey = (rfid: string): void => {
        const filterKey: Key | undefined = props.keyList.find(
            (key) => key.rfid === rfid
        );
        if (filterKey) {
            setBorrowReq((prevBorrowReq) => {
                if (!prevBorrowReq.keyList.includes(filterKey)) {
                    return {
                        ...prevBorrowReq,
                        keyList: [...prevBorrowReq.keyList, filterKey],
                    };
                }
                return prevBorrowReq;
            });
        }
    };

    const isValid = (): boolean => {
        return (
            borrowReq.passId !== "" &&
            borrowReq.purpose !== "" &&
            borrowReq.keyList.length !== 0
        );
    };

    return (
        <Box>
            <Grid container spacing={2} marginBottom={3}>
                <Grid size={3}>
                    <Grid container spacing={1}>
                        <Grid size={3}>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                height="100%"
                                lineHeight={2.5}
                            >
                                Pass ID
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <TextField
                                size="small"
                                value={borrowReq.passId}
                                onChange={(
                                    e: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) =>
                                    setBorrowReq({
                                        ...borrowReq,
                                        passId: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid size={3}>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                height="100%"
                                lineHeight={2.5}
                            >
                                Purpose
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <TextField
                                size="small"
                                value={borrowReq.purpose}
                                onChange={(
                                    e: ChangeEvent<
                                        HTMLInputElement | HTMLTextAreaElement
                                    >
                                ) =>
                                    setBorrowReq({
                                        ...borrowReq,
                                        purpose: e.target.value,
                                    })
                                }
                            />
                        </Grid>
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
                                : {lastKey().id ? lastKey().type : ""}
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body1" color="text.secondary">
                                Name
                            </Typography>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="body1">
                                : {lastKey().id ? lastKey().name : ""}
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
                                {lastKey().id
                                    ? lastKey()
                                          .quantity.toString()
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
                                : {lastKey().id ? lastKey().location : ""}
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
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Type
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Quantity
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {borrowReq.keyList.length ? (
                                <TableBody>
                                    {borrowReq.keyList.map((key, index) => (
                                        <TableRow
                                            key={key.id}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {key.type}
                                            </TableCell>
                                            <TableCell align="center">
                                                {key.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {key.quantity} Pcs
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
                                        <TableCell align="center" colSpan={6}>
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
                    onEnter={() => selectKey(rfid)}
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{ float: "right" }}
                    disabled={!isValid()}
                    onClick={() => props.borrowKey(borrowReq)}
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
