import React, { FC, useState, useEffect } from "react";
import { TextField, Paper, Typography, makeStyles } from "@material-ui/core";
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

export interface SipFormState {
  accountNumber: string;
  displayName: string;
  userName: string;
  password: string;
}
interface Props {
  initialState: SipFormState;
  name: string;
  onChange: (name: string, state: SipFormState) => void;
}

export const SipAccountConfigForm: FC<Props> = ({
  name,
  initialState,
  onChange
}) => {
  const classes = useStyles();
  const [phoneNumberValue, setPhoneNumberValue] = useState(
    initialState.accountNumber
  );
  const [displayNameValue, setDisplayNameValue] = useState(
    initialState.displayName
  );
  const [userNameValue, setUserNameValue] = useState(initialState.userName);
  const [passwordValue, setPasswordValue] = useState(initialState.password);

  useEffect(() => {
    onChange(name, {
      accountNumber: phoneNumberValue,
      displayName: displayNameValue,
      userName: userNameValue,
      password: passwordValue
    });
  }, [phoneNumberValue, displayNameValue, userNameValue, passwordValue]);

  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>{name}</Typography>
      <TextField
        type="text"
        label="Account number"
        value={phoneNumberValue}
        onChange={event => setPhoneNumberValue(event.target.value)}
      />
      <TextField
        type="text"
        label="Display name"
        value={displayNameValue}
        onChange={event => setDisplayNameValue(event.target.value)}
      />
      <TextField
        type="text"
        label="Username"
        value={userNameValue}
        onChange={event => setUserNameValue(event.target.value)}
      />
      <TextField
        type="text"
        label="Password"
        value={passwordValue}
        onChange={event => setPasswordValue(event.target.value)}
      />
    </Paper>
  );
};
