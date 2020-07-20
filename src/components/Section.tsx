import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  bar: {},
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
  },
  container: {
    justifyContent: "center",
    display: "flex",
  },
}));

interface Props {
  name: string;
}
export const Section: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.bar}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          className={classes.heading}
          style={{
            margin: "auto",
          }}
        >
          {props.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.container}>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};
