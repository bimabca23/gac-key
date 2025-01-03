import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { History } from "../types/history/History";
import { Key } from "../types/key/Key";
import { Pic } from "../types/pic/Pic";
import { ReturnReq } from "../types/return/ReturnReq";

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
    time: moment().toISOString(),
    historyList: props.historyList,
  });
  const [check, setCheck] = useState<boolean>(false);
  const [rfid, setRfid] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<Key>({
    id: 0,
    rfid: "No",
    type: "Main",
    name: "",
    quantity: 0,
    location: "",
    status: "Available",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectHistory = (rfid: string): void => {
    const newHistory: History[] = returnReq.historyList.map((history) => {
      if (history.key.rfid === rfid) {
        setSelectedKey(history.key);
        return {
          ...history,
          status: "Inactive",
        };
      }
      return history;
    });
    setReturnReq({ ...returnReq, historyList: newHistory });
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRfid(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      selectHistory(rfid);
      setRfid("");
    }
  };

  const onFocus = (): void => {
    setCheck(true);
  };

  const onBlur = (): void => {
    setCheck(false);
  };

  const isValid = (): boolean => {
    return (
      returnReq.historyList.filter((history) => history.status === "Inactive")
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
                  ? selectedKey.quantity.toString().concat(" Pcs")
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
                  <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
                    Clock
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
                    PIC
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", p: 1 }}>
                    SOC
                  </TableCell>
                </TableRow>
              </TableHead>
              {returnReq.historyList.length ? (
                <TableBody>
                  {returnReq.historyList.map((history, index) => (
                    <TableRow
                      key={history.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        background:
                          history.status === "Inactive"
                            ? colors.green[500]
                            : "transparent",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {history.passId}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {history.key.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {history.purpose}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {moment(history.borrowTime)
                          .utcOffset(7)
                          .format("DD/MM/YY")}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {moment(history.borrowTime)
                          .utcOffset(7)
                          .format("HH:mm")}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
                        }}
                      >
                        {history.borrowPic}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            history.status === "Inactive" ? "white" : "black",
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
        <TextField
          inputRef={inputRef}
          value={rfid}
          size="small"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          sx={{
            position: "absolute",
            left: -1000,
          }}
        />
        <Button
          variant="contained"
          size="large"
          color={check ? "success" : "error"}
          sx={{
            animation: check ? "ping 1s infinite" : "none",
            "@keyframes ping": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.75 },
              "100%": { opacity: 1 },
            },
          }}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          RFID ({check ? "ON" : "OFF"})
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ float: "right" }}
          disabled={!isValid()}
          onClick={() =>
            props.returnKey({
              ...returnReq,
              historyList: returnReq.historyList.filter(
                (history) => history.status === "Inactive"
              ),
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
