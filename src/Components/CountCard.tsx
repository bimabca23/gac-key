import { colors } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

interface Props {
  count: string;
  text: string;
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
            <Typography variant="h2">{props.count}</Typography>
            <Typography variant="h4" color={colors.grey[700]}>
              {props.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Detail</Button>
          </CardActions>
        </Fragment>
      </Card>
    </Box>
  );
}