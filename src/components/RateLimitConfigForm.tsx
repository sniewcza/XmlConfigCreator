import React, { FC } from "react";
import {
  Box,
  TextField,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 400,
    paddingTop: 15,
    margin: "auto",
    paddingBottom: 15,
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

interface Props {
  name: string;
}
export const RateLimitConfigForm: FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>{props.name}</Typography>
      <TextField type="number" label="Downstream"></TextField>
      <TextField type="number" label="Upstream"></TextField>
    </Paper>
  );
};
