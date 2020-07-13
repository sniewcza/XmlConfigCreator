import { createLanConfig, LanConfig } from "../model/LanConfig";

describe("Lan config tests", () => {
  test("Should return Lan config", () => {
    const config: LanConfig = {
      enabled: true,
      mode: "AUTO"
    };
    const returnedConfig = createLanConfig(config.enabled, config.mode);
    expect(returnedConfig).toEqual(config);
  });

  test("Should throw exception for invalid mode type", () => {
    const fn = () => {
      createLanConfig(false, "InvalidMode");
    };
    expect(fn).toThrowError(/Invalid mode type./);
  });
});
