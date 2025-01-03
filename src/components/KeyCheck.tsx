import { FormLabel, TextField, colors } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { Key } from "../types/key/Key";

interface Props {
    keyList: Key[];
}

export default function KeyCheck(props: Props) {
    const [check, setCheck] = useState<boolean>(false);
    const [rfid, setRfid] = useState<string>("");
    const [key, setKey] = useState<Key>({
        id: 0,
        rfid: "No",
        type: "Main",
        name: "",
        quantity: 0,
        location: "",
        status: "Available",
    });

    const getKey = (rfid: string): void => {
        const filterKey: Key | undefined = props.keyList.find(
            (key) => key.rfid === rfid
        );
        setKey(
            filterKey ?? {
                id: 0,
                rfid: "No",
                type: "Main",
                name: "",
                quantity: 0,
                location: "",
                status: "Available",
            }
        );
    };

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setRfid(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter") {
            getKey(rfid);
            setRfid("");
        }
    };

    const onFocus = (): void => {
        setCheck(true);
    };

    const onBlur = (): void => {
        setCheck(false);
        setKey({
            id: 0,
            rfid: "No",
            type: "Main",
            name: "",
            quantity: 0,
            location: "",
            status: "Available",
        });
    };

    return (
        <Box minWidth={275} width="100%">
            <Card
                variant="outlined"
                sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1 }}
            >
                <Fragment>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid size={3}>
                                <Typography variant="h4" color="text.secondary">
                                    Type
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography variant="h4">
                                    : {key.id ? key.type : ""}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="h4" color="text.secondary">
                                    Name
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography variant="h4">
                                    : {key.id ? key.name : ""}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="h4" color="text.secondary">
                                    Quantity
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography variant="h4">
                                    : {key.id ? key.quantity : ""}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography variant="h4" color="text.secondary">
                                    Location
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography variant="h4">
                                    : {key.id ? key.location : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <FormLabel
                            htmlFor="rfid-check"
                            sx={{
                                width: "100%",
                                fontSize: 25,
                                backgroundColor: check
                                    ? colors.green[700]
                                    : colors.red[700],
                                py: 1,
                                borderRadius: 1,
                                textAlign: "center",
                                color: "white",
                                cursor: "pointer",
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.4)",
                                animation: check ? "ping 1s infinite" : "none",
                                "@keyframes ping": {
                                    "0%": { transform: "scale(1)", opacity: 1 },
                                    "50%": {
                                        transform: "scale(1.01)",
                                        opacity: 0.75,
                                    },
                                    "100%": {
                                        transform: "scale(1)",
                                        opacity: 1,
                                    },
                                },
                            }}
                        >
                            CHECKER ({check ? "ON" : "OFF"})
                        </FormLabel>
                        <TextField
                            value={rfid}
                            id="rfid-check"
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
                    </CardActions>
                </Fragment>
            </Card>
        </Box>
    );
}
