import {
    Box,
    Button,
    Grid2 as Grid,
    TextField,
    Typography,
} from "@mui/material";
import RfidButton from "../RfidButton";
import { AddPicReq } from "../../types/pic/AddPicReq";
import { ChangeEvent, useState } from "react";

interface Props {
    addPicReq: AddPicReq;
    setAddPicReq(value: AddPicReq): void;
    addPic(): void;
    onClose(): void;
}

export default function AddPicForm(props: Props) {
    const [rfid, setRfid] = useState<string>("");

    const isValid = (): boolean => {
        return (
            props.addPicReq.rfid !== "" &&
            props.addPicReq.name !== "" &&
            props.addPicReq.initial !== ""
        );
    };

    return (
        <Box>
            <Grid container spacing={2} marginBottom={3}>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        RFID
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addPicReq.rfid}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        Name
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addPicReq.name}
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) =>
                            props.setAddPicReq({
                                ...props.addPicReq,
                                name: e.target.value,
                            })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        Initial
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addPicReq.initial}
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) =>
                            props.setAddPicReq({
                                ...props.addPicReq,
                                initial: e.target.value,
                            })
                        }
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Box>
                <RfidButton
                    rfid={rfid}
                    setRfid={setRfid}
                    onEnter={() =>
                        props.setAddPicReq({ ...props.addPicReq, rfid: rfid })
                    }
                />
                <Button
                    color={isValid() ? "primary" : "secondary"}
                    variant="contained"
                    size="large"
                    sx={{ float: "right" }}
                    onClick={
                        isValid()
                            ? () => {
                                  props.onClose();
                                  props.addPic();
                              }
                            : () => {}
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
