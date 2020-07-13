export const LanModeAuto = "AUTO";

export type LanMode = typeof LanModeAuto;

export type LanConfig = {
  enabled: boolean;
  mode: LanMode;
};

export const createLanConfig = (
  enabled: boolean,
  mode = LanModeAuto
): LanConfig => {
  if (mode !== LanModeAuto) {
    throw new Error(`Invalid mode type. Valid is ${LanModeAuto}`);
  }
  return {
    enabled: !!enabled,
    mode
  };
};
