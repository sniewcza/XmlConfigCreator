import React, { FC, useState, ChangeEvent } from "react";
import {
  makeStyles,
  Box,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@material-ui/core";
import { LabeledCheckBox } from "./LabeledCheckbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: 400,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

interface FormState {
  enabled: boolean;
  mode: string;
}

interface Props {
  name: string;
  onChange: (state: FormState) => void;
}
export const LanConfigForm: FC<Props> = (props) => {
  const classes = useStyles();
  const [formActive, setFormActive] = useState(true);
  const [selectedMode, setSelectedMode] = useState("AUTO");

  const handleFormActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormActive(event.target.checked);
  };
  const handleSelectChange = (event: any) => {
    setSelectedMode(event.target.value);
  };
  return (
    <Paper className={classes.root} elevation={5}>
      <Typography>{props.name}</Typography>
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
