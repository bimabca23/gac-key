import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

interface Props {
    count: number;
    text: string;
    click(): void;
}

export default function CountCard(props: Props) {
    return (
        <Box minWidth={275} width="100%">
            <Card
                variant="outlined"
                sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.4)", p: 1 }}
            >
                <Fragment>
                    <CardContent>
                        <Typography fontSize={60}>{props.count}</Typography>
                        <Typography fontSize={30}>{props.text}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={props.click}>Detail</Button>
                    </CardActions>
                </Fragment>
            </Card>
        </Box>
    );
}
