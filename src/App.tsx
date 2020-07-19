import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { Template } from "./model/XmlConfigTemplate";
import Paper from "@material-ui/core/Paper";
import { Section } from "./components/Section";
import { Card, Checkbox } from "@material-ui/core";
import { WanConfigForm } from "./components/WanConfigForm";
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
    </div>
  );
}

export default App;
