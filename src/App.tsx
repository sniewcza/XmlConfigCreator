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
        <Fragment>
          <Section name="WAN1">
            <WanConfigForm name="WAN1" onChange={(state) => {}}></WanConfigForm>
          </Section>
          <Section name="WAN2">
            <WanConfigForm name="WAN2" onChange={(state) => {}}></WanConfigForm>
          </Section>
          <Section name="WAN3">
            <WanConfigForm name="WAN3" onChange={(state) => {}}></WanConfigForm>
          </Section>
          <Section name="WAN4">
            <WanConfigForm name="WAN4" onChange={(state) => {}}></WanConfigForm>
          </Section>
        </Fragment>
        <Grid
          container
          direction="column"
          spacing={1}
        >
          <Grid item>
            <LanConfigForm name="LAN1" onChange={(state) => {}}></LanConfigForm>
          </Grid>

          <Grid item>
            <LanConfigForm name="LAN2" onChange={(state) => {}}></LanConfigForm>
          </Grid>
          <Grid item>
            <LanConfigForm name="LAN3" onChange={(state) => {}}></LanConfigForm>
          </Grid>
          <Grid item>
            <LanConfigForm name="LAN4" onChange={(state) => {}}></LanConfigForm>
          </Grid>
        </Grid>
      </TabNavigator>
    </div>
  );
}

export default App;
