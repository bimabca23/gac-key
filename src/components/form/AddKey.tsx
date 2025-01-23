import {
    Box,
    Button,
    FormControl,
    Grid2 as Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import RfidButton from "../RfidButton";
import { ChangeEvent, useState } from "react";
import { AddKeyReq } from "../../types/key/AddKeyReq";

interface Props {
    addKeyReq: AddKeyReq;
    setAddKeyReq(value: AddKeyReq): void;
    addKey(): void;
    onClose(): void;
}

export default function AddKeyForm(props: Props) {
    const [rfid, setRfid] = useState<string>("");

    const isValid = (): boolean => {
        return (
            props.addKeyReq.rfid !== "" &&
            props.addKeyReq.name !== "" &&
            props.addKeyReq.room !== "" &&
            props.addKeyReq.quantity > 0 &&
            props.addKeyReq.location !== ""
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
                        value={props.addKeyReq.rfid}
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
                        Type
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <FormControl fullWidth>
                        <Select
                            size="small"
                            value={props.addKeyReq.type}
                            onChange={(
                                e: SelectChangeEvent<"Main" | "Spare">
                            ) => {
                                props.setAddKeyReq({
                                    ...props.addKeyReq,
                                    type: e.target.value as unknown as
                                        | "Main"
                                        | "Spare",
                                });
                            }}
                        >
                            <MenuItem value="Main">Main</MenuItem>
                            <MenuItem value="Spare">Spare</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        Name
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addKeyReq.name}
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) =>
                            props.setAddKeyReq({
                                ...props.addKeyReq,
                                name: e.target.value,
                            })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        Room
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addKeyReq.room}
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) =>
                            props.setAddKeyReq({
                                ...props.addKeyReq,
                                room: e.target.value,
                            })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        Quantity
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addKeyReq.quantity}
                        type="number"
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) =>
                            props.setAddKeyReq({
                                ...props.addKeyReq,
                                quantity: parseInt(e.target.value),
                            })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <Typography variant="body1" height="100%" lineHeight={2.5}>
                        Location
                    </Typography>
                </Grid>
                <Grid size={9}>
                    <TextField
                        size="small"
                        value={props.addKeyReq.location}
                        onChange={(
                            e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) =>
                            props.setAddKeyReq({
                                ...props.addKeyReq,
                                location: e.target.value,
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
                        props.setAddKeyReq({ ...props.addKeyReq, rfid: rfid })
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
                                  props.addKey();
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
