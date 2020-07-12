export const LanModeAuto = "AUTO";

export type LanMode = typeof LanModeAuto;

export type LanConfig = {
  enabled: boolean;
  mode: LanMode;
};
