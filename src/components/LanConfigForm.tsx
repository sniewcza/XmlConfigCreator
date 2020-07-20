import React, { FC, useState, ChangeEvent } from "react";
import {
  makeStyles,
  Box,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { LabeledCheckBox } from "./LabeledCheckbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 450,
    flexDirection: "column",
    alignItems: "center",
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
    <Box mx="auto" py={2} className={classes.root}>
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
    </Box>
  );
};
