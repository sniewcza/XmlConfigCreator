import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { Template } from "./model/XmlConfigTemplate";

const parser = new DOMParser();
const xmlserialzier = new XMLSerializer();
function App() {
  const saveTestFile = () => {
    const document = parser.parseFromString(Template, "text/xml");
    const documentString = xmlserialzier.serializeToString(document);
    const file = new File([documentString], "TestFile.xml", {
      type: "text/plain;charset=utf-8"
    });
    saveAs(file);
  };

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={saveTestFile}>
        Create test file
      </Button>
    </div>
  );
}

export default App;
