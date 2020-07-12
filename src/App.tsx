import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";

function App() {
  const saveTestFile = () => {
    var file = new File(["Hello, world!"], "TestFile.txt", {
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
