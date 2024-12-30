import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";

export default function KeyCheck() {
  const [check, setCheck] = useState<boolean>(false);
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
                  ID
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography variant="h4">: 1</Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="h4" color="text.secondary">
                  Type
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography variant="h4">: Main</Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="h4" color="text.secondary">
                  Name
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography variant="h4">: UPS 3A01</Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="h4" color="text.secondary">
                  Quantity
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography variant="h4">: 1</Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="h4" color="text.secondary">
                  Location
                </Typography>
              </Grid>
              <Grid size={9}>
                <Typography variant="h4">: Rack Hitam 1</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                width: "100%",
                fontSize: 25,
                animation: check ? "ping 1s infinite" : "none",
                "@keyframes ping": {
                  "0%": { transform: "scale(1)", opacity: 1 },
                  "50%": { transform: "scale(1.01)", opacity: 0.75 },
                  "100%": { transform: "scale(1)", opacity: 1 },
                },
              }}
              variant="contained"
              color={check ? "success" : "error"}
              onClick={() => setCheck(!check)}
            >
              {check ? "Checker On" : "Checker Off"}
            </Button>
          </CardActions>
        </Fragment>
      </Card>
    </Box>
  );
}
