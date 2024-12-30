import { Button, FormLabel, TextField, colors } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { Key } from "../types/key/Key";

export interface Props {
  keyList: Key[];
  setKeyList(keyList: Key[]): void;
}

export default function ActionBox(props: Props) {
  const [borrow, setBorrow] = useState<boolean>(false);
  const [rfidBorrow, setRfidBorrow] = useState<string>("");
  const [return_, setReturn] = useState<boolean>(false);
  const [rfidReturn, setRfidReturn] = useState<string>("");

  const borrowKey = (rfid: string): void => {
    props.setKeyList(
      props.keyList.map((key) =>
        key.rfid === rfid ? { ...key, status: "Not Available" } : key
      )
    );
  };

  const onChangeBorrow = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRfidBorrow(e.target.value);
  };

  const onKeyDownBorrow = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      borrowKey(rfidBorrow);
      setRfidBorrow("");
    }
  };

  const onFocusBorrow = (): void => setBorrow(true);

  const onBlurBorrow = (): void => setBorrow(false);

  const returnKey = (rfid: string): void => {
    props.setKeyList(
      props.keyList.map((key) =>
        key.rfid === rfid ? { ...key, status: "Available" } : key
      )
    );
  };

  const onChangeReturn = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRfidReturn(e.target.value);
  };

  const onKeyDownReturn = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      returnKey(rfidReturn);
      setRfidReturn("");
    }
  };

  const onFocusReturn = (): void => setReturn(true);

  const onBlurReturn = (): void => setReturn(false);

  return (
    <Box minWidth={275} width="100%">
      <Card
        variant="outlined"
        sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1 }}
      >
        <Fragment>
          <CardContent>
            <Typography variant="h4">Key Flow</Typography>
          </CardContent>
          <CardActions>
            <FormLabel
              htmlFor="rfid-borrow"
              sx={{
                width: "100%",
                fontSize: 25,
                backgroundColor: borrow ? colors.green[700] : colors.blue[700],
                py: 1,
                borderRadius: 1,
                textAlign: "center",
                color: "white",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.4)",
                animation: borrow ? "ping 1s infinite" : "none",
                "@keyframes ping": {
                  "0%": { transform: "scale(1)", opacity: 1 },
                  "50%": { transform: "scale(1.01)", opacity: 0.75 },
                  "100%": { transform: "scale(1)", opacity: 1 },
                },
              }}
              onClick={() => setBorrow(!borrow)}
            >
              KEY BORROW ({borrow ? "ON" : "OFF"})
            </FormLabel>
            <TextField
              value={rfidBorrow}
              id="rfid-borrow"
              size="small"
              onChange={onChangeBorrow}
              onKeyDown={onKeyDownBorrow}
              onFocus={onFocusBorrow}
              onBlur={onBlurBorrow}
              sx={{
                position: "absolute",
                left: -1000,
              }}
            />
          </CardActions>
          <CardActions>
            <FormLabel
              htmlFor="rfid-return"
              sx={{
                width: "100%",
                fontSize: 25,
                backgroundColor: return_ ? colors.green[700] : colors.blue[700],
                py: 1,
                borderRadius: 1,
                textAlign: "center",
                color: "white",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.4)",
                animation: return_ ? "ping 1s infinite" : "none",
                "@keyframes ping": {
                  "0%": { transform: "scale(1)", opacity: 1 },
                  "50%": { transform: "scale(1.01)", opacity: 0.75 },
                  "100%": { transform: "scale(1)", opacity: 1 },
                },
              }}
              onClick={() => setReturn(!return_)}
            >
              KEY RETURN ({return_ ? "ON" : "OFF"})
            </FormLabel>
            <TextField
              value={rfidReturn}
              id="rfid-return"
              size="small"
              onChange={onChangeReturn}
              onKeyDown={onKeyDownReturn}
              onFocus={onFocusReturn}
              onBlur={onBlurReturn}
              sx={{
                position: "absolute",
                left: -1000,
              }}
            />
          </CardActions>
        </Fragment>
      </Card>
      <Card
        variant="outlined"
        sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1, mt: 4 }}
      >
        <Fragment>
          <CardContent>
            <Typography variant="h4">Action</Typography>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                width: "100%",
                fontSize: 25,
              }}
              variant="contained"
              color="warning"
            >
              Update
            </Button>
          </CardActions>
        </Fragment>
      </Card>
    </Box>
  );
}
