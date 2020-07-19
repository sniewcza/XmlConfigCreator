export const RouterMode = "ROUTER";
export const BridgeMode = "BRIDGE";
export const CONNECTION_MODE_DHCP = "DHCP";
export const CONNECTION_MODE_PPPOE = "PPPOE";

export type WanMode = typeof RouterMode | typeof BridgeMode;
export type ConnectionType =
  | typeof CONNECTION_MODE_DHCP
  | typeof CONNECTION_MODE_PPPOE;

export type WanConfig = {
  active: boolean;
  mode: WanMode;
  lan1Enabled: boolean;
  lan2Enabled: boolean;
  lan3Enabled: boolean;
  lan4Enabled: boolean;
  wlan2_4GEnabled: boolean;
  wlan5GEnabled: boolean;
  connectionType?: ConnectionType;
  vlanId?: number;
  cos?: number;
};

export const createWanConfig = (
  active: boolean,
  mode: string,
  lan1: boolean,
  lan2: boolean,
  lan3: boolean,
  lan4: boolean,
  wlan2_4G: boolean,
  wlan5G: boolean,
  connectionType?: string,
  vlanId?: string,
  cos?: string
): WanConfig => {
  if (mode !== RouterMode && mode !== BridgeMode) {
    throw new Error(
      `Invalid mode type. Valid types are: ${RouterMode} or ${BridgeMode}`
    );
  }
  if (mode === RouterMode) {
    if (
      connectionType !== CONNECTION_MODE_DHCP &&
      connectionType !== CONNECTION_MODE_PPPOE
    ) {
      throw new Error(
        `Invalid connection type. Valid types are ${CONNECTION_MODE_DHCP} or ${CONNECTION_MODE_PPPOE}`
      );
    }
    if (!vlanId) throw new Error("Missing vlanId property");
    const vlanIdNumber = Number.parseInt(vlanId);
    if (isNaN(vlanIdNumber)) throw new Error("Cannot parse vlanId to number");
    if (!cos) throw new Error("Missing cos property");
    const cosNumber = Number.parseInt(cos);
    if (isNaN(cosNumber))
      throw new Error("Cannot parse cos property to number");
    return {
      active,
      mode,
      lan1Enabled: lan1,
      lan2Enabled: lan2,
      lan3Enabled: lan3,
      lan4Enabled: lan4,
      wlan2_4GEnabled: wlan2_4G,
      wlan5GEnabled: wlan5G,
      vlanId: vlanIdNumber,
      cos: cosNumber
    };
  }
  return {
    active,
    mode,
    lan1Enabled: lan1,
    lan2Enabled: lan2,
    lan3Enabled: lan3,
    lan4Enabled: lan4,
    wlan2_4GEnabled: wlan2_4G,
    wlan5GEnabled: wlan5G
  };
};
