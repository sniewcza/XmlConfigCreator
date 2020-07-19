import React, { FC } from "react";
import { FormControlLabel, Checkbox, CheckboxProps } from "@material-ui/core";

interface Props extends CheckboxProps {
  checked: boolean;
  label: string;
  name: string;
}
export const LabeledCheckBox: FC<Props> = ({
  checked,
  name,
  label,
  onChange,
}) => (
  <FormControlLabel
    control={<Checkbox checked={checked} onChange={onChange} name={name} />}
    label={label}
  />
);
