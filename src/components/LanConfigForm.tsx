import React, { FC, useState, ChangeEvent, useEffect } from "react";
import {
  makeStyles,
  MenuItem,
  Select,
  Typography,
  Paper
} from "@material-ui/core";
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

export interface LanFormState {
  enabled: boolean;
  mode: string;
}

interface Props {
  name: string;
  initialState: LanFormState;
  onChange: (name: string, state: LanFormState) => void;
}

export const LanConfigForm: FC<Props> = ({ name, initialState, onChange }) => {
  const classes = useStyles();
  const [formActive, setFormActive] = useState(initialState.enabled);
  const [selectedMode, setSelectedMode] = useState(initialState.mode);

  useEffect(() => {
    onChange(name, {
      enabled: formActive,
      mode: selectedMode
    });
  }, [formActive, selectedMode]);

  const handleFormActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormActive(event.target.checked);
  };
  const handleSelectChange = (event: any) => {
    setSelectedMode(event.target.value);
  };
  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>{name}</Typography>
      <LabeledCheckBox
        checked={formActive}
        name="active"
        label="Active"
        onChange={handleFormActiveChange}
      />
      <Select value={selectedMode} onChange={handleSelectChange}>
        <MenuItem value={"AUTO"}>AUTO</MenuItem>
      </Select>
    </Paper>
  );
};
