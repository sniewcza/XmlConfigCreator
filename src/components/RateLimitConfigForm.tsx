import React, { FC, useState, useEffect } from "react";
import { TextField, makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: 400,
    paddingTop: 15,
    margin: "auto",
    paddingBottom: 15,
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
}));

export interface RateLimitFormState {
  downStreamValue: string;
  upStreamValue: string;
}

interface Props {
  name: string;
  initialState: RateLimitFormState;
  onChange: (name: string, state: RateLimitFormState) => void;
}

export const RateLimitConfigForm: FC<Props> = ({
  name,
  initialState,
  onChange
}) => {
  const classes = useStyles();
  const [downStreamValue, setDownStreamValue] = useState(
    initialState.downStreamValue
  );
  const [upStreamValue, setUpStreamValue] = useState(
    initialState.upStreamValue
  );
  useEffect(() => {
    onChange(name, {
      downStreamValue,
      upStreamValue
    });
  }, [downStreamValue, upStreamValue]);
  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>{name}</Typography>
      <TextField
        type="number"
        label="Downstream"
        onChange={event => setDownStreamValue(event.target.name)}
      />
      <TextField
        type="number"
        label="Upstream"
        onChange={event => setUpStreamValue(event.target.name)}
      />
    </Paper>
  );
};
