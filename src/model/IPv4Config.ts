export type IPv4Config = {
  IPAdress: string;
  netMask: string;
  DHCPServerEnabled: boolean;
  DHCPPoolStart?: string;
  DHCPPoolEnd?: string;
  DHCPGateway?: string;
};

export const createIPv4Config = (
  ipAdress: string,
  netMask: string,
  DHCPEnabled?: boolean,
  DHCPPollStart?: string,
  DHCPPoolEnd?: string,
  DHCPGateway?: string
): IPv4Config => {
  validateIPaddress(ipAdress);
  validateIPaddress(netMask);
  if (DHCPEnabled) {
    validateIPaddress(DHCPPollStart);
    validateIPaddress(DHCPPoolEnd);
    validateIPaddress(DHCPGateway);
    return {
      IPAdress: ipAdress,
      netMask,
      DHCPServerEnabled: DHCPEnabled,
      DHCPPoolStart: DHCPPollStart,
      DHCPPoolEnd: DHCPPoolEnd,
      DHCPGateway
    };
  }

  return {
    IPAdress: ipAdress,
    netMask,
    DHCPServerEnabled: !!DHCPEnabled
  };
};

const validateIPaddress = (ipaddress?: string) => {
  if (!ipaddress) throw new Error("Undefined is not valid IPv4 address");
  const result = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ipaddress
  );
  if (!result) throw new Error(`${ipaddress} is not valid IPv4 address`);
};
