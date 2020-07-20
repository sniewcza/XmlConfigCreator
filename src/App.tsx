import React, { Fragment } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { Template } from "./model/XmlConfigTemplate";
import Paper from "@material-ui/core/Paper";
import { Section } from "./components/Section";
import { TabNavigator } from "./components/TabNavigator";
import { WanConfigForm } from "./components/WanConfigForm";
import { LanConfigForm } from "./components/LanConfigForm";
import { Grid } from "@material-ui/core";
import { RateLimitConfigForm } from "./components/RateLimitConfigForm";
import { SipAccountConfigForm } from "./components/SipAccountConfigForm";
const parser = new DOMParser();
const xmlserialzier = new XMLSerializer();
function App() {
  const saveTestFile = () => {
    const document = parser.parseFromString(Template, "text/xml");
    const documentString = xmlserialzier.serializeToString(document);
    const file = new File([documentString], "TestFile.xml", {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file);
  };

  return (
    <div className="App">
      <TabNavigator>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs>
            <WanConfigForm name="WAN1" onChange={(state) => {}} />
          </Grid>
          <Grid item xs>
            <WanConfigForm name="WAN2" onChange={(state) => {}} />
          </Grid>
          <Grid item xs>
            <WanConfigForm name="WAN3" onChange={(state) => {}} />
          </Grid>
          <Grid item xs>
            <WanConfigForm name="WAN4" onChange={(state) => {}} />
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item xs>
            <LanConfigForm name="LAN1" onChange={(state) => {}} />
          </Grid>
          <Grid item xs>
            <LanConfigForm name="LAN2" onChange={(state) => {}} />
          </Grid>
          <Grid item xs>
            <LanConfigForm name="LAN3" onChange={(state) => {}} />
          </Grid>
          <Grid item xs>
            <LanConfigForm name="LAN4" onChange={(state) => {}} />
          </Grid>
        </Grid>
        <RateLimitConfigForm name={"Rate Limit"}></RateLimitConfigForm>
        <SipAccountConfigForm></SipAccountConfigForm>
      </TabNavigator>
    </div>
  );
}

export default App;
