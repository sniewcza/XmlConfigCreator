import React, { FC, useState, useEffect } from "react";
import { makeStyles, Paper, Typography, TextField } from "@material-ui/core";
import { LabeledCheckBox } from "./LabeledCheckbox";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: 400,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  }
}));

export interface IPv4FormState {
  ipAddress: string;
  netmask: string;
  dhcpEnabled: boolean;
  dhcpPoolStart: string;
  dhcpPoolEnd: string;
  gateway: string;
}

interface Props {
  name: string;
  initialState: IPv4FormState;
  onChange: (name: string, state: IPv4FormState) => void;
}

export const IPv4ConfigForm: FC<Props> = ({ name, initialState, onChange }) => {
  const classes = useStyles();
  const [ipAddressValue, setIPAddressValue] = useState(initialState.ipAddress);
  const [netmaskValue, setNetmaskValue] = useState(initialState.netmask);
  const [dhcpEnabled, setDhcpEnabled] = useState(initialState.dhcpEnabled);
  const [dhcpPoolStartValue, setDhcpPoolStartValue] = useState(
    initialState.dhcpPoolStart
  );
  const [dhcpPoolendValue, setDhcpPoolendValue] = useState(
    initialState.dhcpPoolEnd
  );
  const [gateWayValue, setGateWayValue] = useState(initialState.gateway);

  useEffect(() => {
    onChange(name, {
      ipAddress: ipAddressValue,
      netmask: netmaskValue,
      dhcpEnabled: dhcpEnabled,
      dhcpPoolStart: dhcpPoolStartValue,
      dhcpPoolEnd: dhcpPoolendValue,
      gateway: gateWayValue
    });
  }, [
    ipAddressValue,
    netmaskValue,
    dhcpEnabled,
    dhcpPoolStartValue,
    dhcpPoolendValue,
    gateWayValue
  ]);
  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>{name}</Typography>
      <TextField
        type="text"
        label="IP Address"
        value={ipAddressValue}
        onChange={event => setIPAddressValue(event.target.value)}
      />
      <TextField
        type="text"
        label="Netmask"
        value={netmaskValue}
        onChange={event => setNetmaskValue(event.target.value)}
      />
      <LabeledCheckBox
        name="dhcp enabled"
        label="DHCP Enabled"
        checked={dhcpEnabled}
        onChange={event => setDhcpEnabled(event.target.checked)}
      ></LabeledCheckBox>
      <TextField
        disabled={!dhcpEnabled}
        type="text"
        label="DHCP pool start"
        value={dhcpPoolStartValue}
        onChange={event => setDhcpPoolStartValue(event.target.value)}
      />
      <TextField
        disabled={!dhcpEnabled}
        type="text"
        label="DHCP poll end"
        value={dhcpPoolendValue}
        onChange={event => setDhcpPoolendValue(event.target.value)}
      />
      <TextField
        disabled={!dhcpEnabled}
        type="text"
        label="Gateway"
        value={gateWayValue}
        onChange={event => setGateWayValue(event.target.value)}
      />
    </Paper>
  );
};
