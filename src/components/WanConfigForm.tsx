import React, { useState, ChangeEvent, FC, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { Card, MenuItem, TextField, Select, Paper } from "@material-ui/core";
import { LabeledCheckBox } from "./LabeledCheckbox";

const useStyles = makeStyles(theme => ({
  root: {
    width: 450,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  formControl: {
    width: 400,
    margin: theme.spacing(3)
  },
  card: {
    margin: 5
  }
}));

export interface WanFormState {
  active: boolean;
  selectedMode: string;
  selectedConnectionType: string;
  vlanId: string;
  cos: string;
  lan1Active: boolean;
  lan2Active: boolean;
  lan3Active: boolean;
  lan4Active: boolean;
  wlan2_4gActive: boolean;
  wlan5gActive: boolean;
}

interface Props {
  initialState: WanFormState;
  name: string;
  onChange: (name: string, state: WanFormState) => void;
}

export const WanConfigForm: FC<Props> = ({ name, initialState, onChange }) => {
  const classes = useStyles();
  const [formActive, setFormActive] = useState(initialState.active);
  const [selectedMode, setSelectedMode] = useState(initialState.selectedMode);
  const [vlanIdValue, setVlanIdValue] = useState(initialState.vlanId);
  const [cosValue, setCosValue] = useState(initialState.cos);
  const [selectedConnectionType, setSelectedConnectionType] = useState(
    initialState.selectedConnectionType
  );
  const [lanState, setLanState] = useState({
    LAN1: initialState.lan1Active,
    LAN2: initialState.lan2Active,
    LAN3: initialState.lan3Active,
    LAN4: initialState.lan4Active
  });
  const [wlanState, setWlanState] = useState({
    wlan2_4g: initialState.wlan2_4gActive,
    wlan5g: initialState.wlan5gActive
  });

  useEffect(() => {
    onChange(name, {
      active: formActive,
      selectedMode,
      selectedConnectionType,
      vlanId: vlanIdValue,
      cos: cosValue,
      lan1Active: lanState.LAN1,
      lan2Active: lanState.LAN2,
      lan3Active: lanState.LAN3,
      lan4Active: lanState.LAN4,
      wlan2_4gActive: wlanState.wlan2_4g,
      wlan5gActive: wlanState.wlan5g
    });
  }, [
    formActive,
    selectedMode,
    vlanIdValue,
    cosValue,
    selectedConnectionType,
    lanState,
    wlanState
  ]);

  const handleFormActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormActive(event.target.checked);
  };

  const handleVlanIdValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVlanIdValue(event.target.value);
  };

  const handleCosValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCosValue(event.target.value);
  };

  const handleSelectChange = (event: any) => {
    setSelectedMode(event.target.value);
  };

  const handleSelectConncectionTypeChange = (event: any) => {
    setSelectedConnectionType(event.target.value);
  };
  const handleLanStateChange = (event: any) => {
    setLanState({
      ...lanState,
      [event.target.name]: event.target.checked
    });
  };

  const handleWlanStateChange = (event: any) => {
    setWlanState({
      ...wlanState,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <Paper className={classes.root} elevation={5}>
      <LabeledCheckBox
        checked={formActive}
        name="active"
        label="Active"
        onChange={handleFormActiveChange}
      />
      <FormControl
        component="fieldset"
        className={classes.formControl}
        disabled={!formActive}
      >
        <FormGroup>
          <Select value={selectedMode} onChange={handleSelectChange}>
            <MenuItem value={"ROUTER"}>ROUTER</MenuItem>
            <MenuItem value={"BRIDGE"}>BRIDGE</MenuItem>
          </Select>
          {selectedMode === "ROUTER" && (
            <Fragment>
              <Select
                value={selectedConnectionType}
                onChange={handleSelectConncectionTypeChange}
              >
                <MenuItem value={"DHCP"}>DHCP</MenuItem>
                <MenuItem value={"PPPOE"}>PPPOE</MenuItem>
              </Select>
              <TextField
                disabled={!formActive}
                type="number"
                label="Vlan Id"
                value={vlanIdValue}
                onChange={handleVlanIdValueChange}
              ></TextField>
              <TextField
                disabled={!formActive}
                type="number"
                label="COS"
                value={cosValue}
                onChange={handleCosValueChange}
              ></TextField>
            </Fragment>
          )}
          <Card className={classes.card}>
            <LabeledCheckBox
              checked={lanState.LAN1}
              name="LAN1"
              label="LAN1"
              onChange={handleLanStateChange}
            />
            <LabeledCheckBox
              checked={lanState.LAN2}
              name="LAN2"
              label="LAN2"
              onChange={handleLanStateChange}
            />
            <LabeledCheckBox
              checked={lanState.LAN3}
              name="LAN3"
              label="LAN3"
              onChange={handleLanStateChange}
            />
            <LabeledCheckBox
              checked={lanState.LAN4}
              name="LAN4"
              label="LAN4"
              onChange={handleLanStateChange}
            />
          </Card>
          <Card className={classes.card}>
            <LabeledCheckBox
              checked={wlanState.wlan2_4g}
              name="wlan2_4g"
              label="WLan 2.4g SSID"
              onChange={handleWlanStateChange}
            />
            <LabeledCheckBox
              checked={wlanState.wlan5g}
              name="wlan5g"
              label="Wlan 5g SSID"
              onChange={handleWlanStateChange}
            />
          </Card>
        </FormGroup>
      </FormControl>
    </Paper>
  );
};
