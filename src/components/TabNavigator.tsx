import React, { FC, Fragment, useState } from "react";
import { Tabs, Tab, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 5,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));
export const TabNavigator: FC = (props) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: any, value: number) => {
    setSelectedTab(value);
  };

  return (
    <Fragment>
      <Tabs
        centered
        className={classes.root}
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="WAN" aria-controls={`simple-tabpanel-${0}`} />
        <Tab label="LAN" />
        <Tab label="RATE LIMIT" />
        <Tab label="VOIP" />
      </Tabs>
      {React.Children.map(props.children, (child, index) => (
        <TabPanel value={selectedTab} index={index}>
          {child}
        </TabPanel>
      ))}
    </Fragment>
  );
};

function TabPanel(props: any) {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value === index && children}</div>;
}
