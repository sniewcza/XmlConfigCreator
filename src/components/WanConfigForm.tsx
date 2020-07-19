import React, { useState, ChangeEvent, FC, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import {
  Card,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
} from "@material-ui/core";
import { LabeledCheckBox } from "./LabeledCheckbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  formControl: {
    width: 400,
    margin: theme.spacing(3),
    justifyContent: "space-around",
  },
  card: {
    margin: 5,
  },
}));

interface FormState {
  active: boolean;
  selectedMode: string;
  lan1Active: boolean;
  lan2Active: boolean;
  lan3Active: boolean;
  lan4Active: boolean;
  wlan2_4gActive: boolean;
  wlan5gActive: boolean;
}
interface Props {
  initialState?: FormState;
  name: string;
  onChange: (state: FormState) => void;
}

export const WanConfigForm: FC<Props> = (props) => {
  const classes = useStyles();
  const [formActive, setFormActive] = useState(true);
  const [selectedMode, setSelectedMode] = useState("ROUTER");
  const [selectedConnectionType, setSelectedConnectionType] = useState("DHCP");
  const [lanState, setLanState] = useState({
    LAN1: false,
    LAN2: false,
    LAN3: false,
    LAN4: false,
  });
  const [wlanState, setWlanState] = useState({
    wlan2_4g: false,
    wlan5g: false,
  });

  const handleFormActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormActive(event.target.checked);
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
      [event.target.name]: event.target.checked,
    });
  };

  const handleWlanStateChange = (event: any) => {
    setWlanState({
      ...wlanState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className={classes.root}>
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
          <Select
            labelId="2"
            value={selectedMode}
            onChange={handleSelectChange}
          >
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
              <TextField type="number" label="Vlan Id"></TextField>
              <TextField type="number" label="COS"></TextField>
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
    </div>
  );
};
