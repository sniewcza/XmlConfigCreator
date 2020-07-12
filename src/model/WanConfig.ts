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
  lan1: boolean;
  lan2: boolean;
  lan3: boolean;
  lan4: boolean;
  wlan2_4G: boolean;
  wlan5G: boolean;
  connectionType?: ConnectionType;
  vlanId?: number;
  cos?: number;
};
