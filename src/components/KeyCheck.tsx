import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { Key } from "../types/key/Key";
import RfidButton from "./RfidButton";
import { CardActions } from "@mui/material";

interface Props {
    keyList: Key[];
}

export default function KeyCheck(props: Props) {
    const [rfid, setRfid] = useState<string>("");
    const [key, setKey] = useState<Key>({
        id: 0,
        rfid: "No",
        type: "Main",
        name: "",
        quantity: 0,
        location: "",
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
            }
        );
    };

    return (
        <Box minWidth={275} width="100%">
            <Card
                variant="outlined"
                sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1 }}
            >
                <Fragment>
                    <CardContent>
                        <Typography fontSize={30} mb={2}>
                            Key Checker
                        </Typography>
                        <Grid container>
                            <Grid size={3}>
                                <Typography
                                    fontSize={25}
                                    color="text.secondary"
                                >
                                    Type
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography fontSize={25}>
                                    : {key.id ? key.type : ""}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography
                                    fontSize={25}
                                    color="text.secondary"
                                >
                                    Name
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography fontSize={25}>
                                    : {key.id ? key.name : ""}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography
                                    fontSize={25}
                                    color="text.secondary"
                                >
                                    Quantity
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography fontSize={25}>
                                    : {key.id ? key.quantity : ""}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <Typography
                                    fontSize={25}
                                    color="text.secondary"
                                >
                                    Location
                                </Typography>
                            </Grid>
                            <Grid size={9}>
                                <Typography fontSize={25}>
                                    : {key.id ? key.location : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <RfidButton
                            rfid={rfid}
                            setRfid={setRfid}
                            onEnter={() => getKey(rfid)}
                            onBlur={() =>
                                setKey({
                                    id: 0,
                                    rfid: "No",
                                    type: "Main",
                                    name: "",
                                    quantity: 0,
                                    location: "",
                                })
                            }
                            fullWidth
                            fontSize={25}
                        />
                    </CardActions>
                </Fragment>
            </Card>
        </Box>
    );
}
