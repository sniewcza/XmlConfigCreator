import React, { Fragment, useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
import { Template } from "./model/XmlConfigTemplate";
import { TabNavigator } from "./components/TabNavigator";
import { WanConfigForm, WanFormState } from "./components/WanConfigForm";
import { LanConfigForm, LanFormState } from "./components/LanConfigForm";
import { Grid } from "@material-ui/core";
import {
  RateLimitConfigForm,
  RateLimitFormState
} from "./components/RateLimitConfigForm";
import {
  SipAccountConfigForm,
  SipFormState
} from "./components/SipAccountConfigForm";

const parser = new DOMParser();
const xmlserialzier = new XMLSerializer();

const sipAccountInitialState: SipFormState = {
  accountNumber: "",
  displayName: "",
  userName: "",
  password: ""
};

const rateLimitInitialState: RateLimitFormState = {
  downStreamValue: "",
  upStreamValue: ""
};

const lanFormInitialState: LanFormState = {
  enabled: true,
  mode: "AUTO"
};

const wanFormInitialState: WanFormState = {
  active: true,
  selectedMode: "ROUTER",
  selectedConnectionType: "DHCP",
  vlanId: "",
  cos: "",
  lan1Active: true,
  lan2Active: true,
  lan3Active: true,
  lan4Active: true,
  wlan2_4gActive: true,
  wlan5gActive: true
};

function App() {
  const saveTestFile = () => {
    const document = parser.parseFromString(Template, "text/xml");
    const documentString = xmlserialzier.serializeToString(document);
    const file = new File([documentString], "TestFile.xml", {
      type: "text/plain;charset=utf-8"
    });
    saveAs(file);
  };
  const [sipFormState, setSipFormState] = useState(sipAccountInitialState);
  const [rateLimitFormState, setRateLimitFormState] = useState(
    rateLimitInitialState
  );
  const [lan1State, setLan1State] = useState(lanFormInitialState);
  const [lan2State, setLan2State] = useState(lanFormInitialState);
  const [lan3State, setLan3State] = useState(lanFormInitialState);
  const [lan4State, setLan4State] = useState(lanFormInitialState);
        
  const [wan1State, setWan1State] = useState(wanFormInitialState);
  const [wan2State, setWan2State] = useState(wanFormInitialState);
  const [wan3State, setWan3State] = useState(wanFormInitialState);
  const [wan4State, setWan4State] = useState(wanFormInitialState);
  return (
    <div className="App">
      <TabNavigator>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs>
            <WanConfigForm
              name="WAN1"
              initialState={wan1State}
              onChange={(name, state) => setWan1State(state)}
            />
          </Grid>
          <Grid item xs>
            <WanConfigForm
              name="WAN2"
              initialState={wan2State}
              onChange={(name, state) => setWan2State(state)}
            />
          </Grid>
          <Grid item xs>
            <WanConfigForm
              name="WAN3"
              initialState={wan3State}
              onChange={(name, state) => setWan3State(state)}
            />
          </Grid>
          <Grid item xs>
            <WanConfigForm
              name="WAN4"
              initialState={wan4State}
              onChange={(name, state) => setWan4State(state)}
            />
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item xs>
            <LanConfigForm
              name="LAN1"
              initialState={lan1State}
              onChange={(name, state) => setLan1State(state)}
            />
          </Grid>
          <Grid item xs>
            <LanConfigForm
              name="LAN2"
              initialState={lan2State}
              onChange={(name, state) => setLan2State(state)}
            />
          </Grid>
          <Grid item xs>
            <LanConfigForm
              name="LAN3"
              initialState={lan3State}
              onChange={(name, state) => setLan3State(state)}
            />
          </Grid>
          <Grid item xs>
            <LanConfigForm
              name="LAN4"
              initialState={lan4State}
              onChange={(name, state) => setLan4State(state)}
            />
          </Grid>
        </Grid>
        <RateLimitConfigForm
          name={"Rate Limit"}
          initialState={rateLimitFormState}
          onChange={(name, state) => setRateLimitFormState(state)}
        ></RateLimitConfigForm>
        <SipAccountConfigForm
          name="SIP1"
          initialState={sipFormState}
          onChange={(name, state) => setSipFormState(state)}
        />
      </TabNavigator>
    </div>
  );
}

export default App;
