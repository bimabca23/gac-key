import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

export default function ActionBox() {
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
            <Button
              sx={{
                width: "100%",
                fontSize: 25,
              }}
              variant="contained"
              color="primary"
            >
              Key Borrow
            </Button>
          </CardActions>
          <CardActions>
            <Button
              sx={{
                width: "100%",
                fontSize: 25,
              }}
              variant="contained"
              color="primary"
            >
              Key Return
            </Button>
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
