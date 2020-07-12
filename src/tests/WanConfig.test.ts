import {
  createWanConfig,
  WanConfig,
  BridgeMode,
  RouterMode,
  CONNECTION_MODE_DHCP
} from "../model/WanConfig";

describe("Wan config creator tests", () => {
  const testConfig: WanConfig = {
    active: true,
    mode: BridgeMode,
    lan1Enabled: true,
    lan2Enabled: true,
    lan3Enabled: true,
    lan4Enabled: false,
    wlan2_4GEnabled: true,
    wlan5GEnabled: true
  };
  test("Should return WanConfig object", () => {
    const config = createWanConfig(
      testConfig.active,
      testConfig.mode,
      testConfig.lan1Enabled,
      testConfig.lan2Enabled,
      testConfig.lan3Enabled,
      testConfig.lan4Enabled,
      testConfig.wlan2_4GEnabled,
      testConfig.wlan5GEnabled
    );
    expect(config).toEqual(testConfig);
  });

  test("Should throw exception for invalid Wan mode type", () => {
    const fn = () => {
      createWanConfig(
        testConfig.active,
        "InvalidModeType",
        testConfig.lan1Enabled,
        testConfig.lan2Enabled,
        testConfig.lan3Enabled,
        testConfig.lan4Enabled,
        testConfig.wlan2_4GEnabled,
        testConfig.wlan5GEnabled
      );
    };
    expect(fn).toThrowError(/Invalid mode type/);
  });

  test("Should throw exception for invalid connection type", () => {
    const fn = () => {
      createWanConfig(
        testConfig.active,
        RouterMode,
        testConfig.lan1Enabled,
        testConfig.lan2Enabled,
        testConfig.lan3Enabled,
        testConfig.lan4Enabled,
        testConfig.wlan2_4GEnabled,
        testConfig.wlan5GEnabled,
        "Invalid connection type"
      );
    };
    expect(fn).toThrowError(/Invalid connection type/);
  });

  test("Should throw exception for missing vlan property", () => {
    const fn = () => {
      createWanConfig(
        testConfig.active,
        RouterMode,
        testConfig.lan1Enabled,
        testConfig.lan2Enabled,
        testConfig.lan3Enabled,
        testConfig.lan4Enabled,
        testConfig.wlan2_4GEnabled,
        testConfig.wlan5GEnabled,
        CONNECTION_MODE_DHCP
      );
    };
    expect(fn).toThrowError(/Missing vlanId property/);
  });

  test("Should throw exception for missing cos property", () => {
    const fn = () => {
      createWanConfig(
        testConfig.active,
        RouterMode,
        testConfig.lan1Enabled,
        testConfig.lan2Enabled,
        testConfig.lan3Enabled,
        testConfig.lan4Enabled,
        testConfig.wlan2_4GEnabled,
        testConfig.wlan5GEnabled,
        CONNECTION_MODE_DHCP,
        "100"
      );
    };
    expect(fn).toThrowError(/Missing cos property/);
  });

  test("Should throw parse exception for vlan property", () => {
    const fn = () => {
      createWanConfig(
        testConfig.active,
        RouterMode,
        testConfig.lan1Enabled,
        testConfig.lan2Enabled,
        testConfig.lan3Enabled,
        testConfig.lan4Enabled,
        testConfig.wlan2_4GEnabled,
        testConfig.wlan5GEnabled,
        CONNECTION_MODE_DHCP,
        "unparsableToInt"
      );
    };
    expect(fn).toThrowError(/Cannot parse vlanId to number/);
  });

  test("Should throw parse exception for cos property", () => {
    const fn = () => {
      createWanConfig(
        testConfig.active,
        RouterMode,
        testConfig.lan1Enabled,
        testConfig.lan2Enabled,
        testConfig.lan3Enabled,
        testConfig.lan4Enabled,
        testConfig.wlan2_4GEnabled,
        testConfig.wlan5GEnabled,
        CONNECTION_MODE_DHCP,
        "100",
        "unparsableToInt"
      );
    };
    expect(fn).toThrowError(/Cannot parse cos property to number/);
  });
});
