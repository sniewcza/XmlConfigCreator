import React, { FC } from "react";
import { TextField, Paper, Typography, makeStyles } from "@material-ui/core";

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

interface Props {}

export const SipAccountConfigForm: FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>SIP1</Typography>
      <TextField type="text" label="Account number"></TextField>
      <TextField type="text" label="Display name"></TextField>
      <TextField type="text" label="Username"></TextField>
      <TextField type="text" label="Password"></TextField>
    </Paper>
  );
};
