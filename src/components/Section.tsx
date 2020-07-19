import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  bar: {
    // backgroundColor: "red",
    // padding: 10,
    //margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
    marginLeft: 200,
  },
  container: {
    flexDirection: "column",
    //justifyContent: "space-between",
  },
  header: {
    alignSelf: "center",
  },
}));

interface Props {
  name: string;
}
export const Section: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.bar}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.container}>
          {props.children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
