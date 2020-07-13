import { createIPv4Config, IPv4Config } from "../model/IPv4Config";

describe("IPv4 config tests", () => {
  describe("Should throw exception for invalid ip adress across config", () => {
    test.each`
      ipAddress         | netMask               | dhcpEnabled | dhcpPoolStart      | dhcpPoolEnd        | dhcpGateway
      ${"192.168.1..1"} | ${"255.255.255.0"}    | ${false}    | ${undefined}       | ${undefined}       | ${undefined}
      ${"192.168.1.1"}  | ${"255.255.255.1000"} | ${false}    | ${undefined}       | ${undefined}       | ${undefined}
      ${"192.168.1.1"}  | ${"255.255.255.0"}    | ${true}     | ${undefined}       | ${undefined}       | ${undefined}
      ${"192.168.1.1"}  | ${"255.255.255.0"}    | ${true}     | ${"192.168.1.100"} | ${undefined}       | ${undefined}
      ${"192.168.1.1"}  | ${"255.255.255.0"}    | ${true}     | ${"192.168.1.100"} | ${"192.168.1.200"} | ${undefined}
    `(
      "",
      ({
        ipAddress,
        netMask,
        dhcpEnabled,
        dhcpPoolStart,
        dhcpPoolEnd,
        dhcpGateway
      }) => {
        const fn = () => {
          createIPv4Config(
            ipAddress,
            netMask,
            dhcpEnabled,
            dhcpPoolStart,
            dhcpPoolEnd,
            dhcpGateway
          );
        };
        expect(fn).toThrow();
      }
    );
  });

  describe("Should return IPv4 config", () => {
    test.each`
      ipAddress        | netMask            | dhcpEnabled | dhcpPoolStart      | dhcpPoolEnd        | dhcpGateway
      ${"192.168.1.1"} | ${"255.255.255.0"} | ${false}    | ${undefined}       | ${undefined}       | ${undefined}
      ${"192.168.1.1"} | ${"255.0.0.0"}     | ${false}    | ${undefined}       | ${undefined}       | ${undefined}
      ${"192.168.1.1"} | ${"255.255.211.0"} | ${true}     | ${"192.168.1.100"} | ${"192.168.1.200"} | ${"192.168.1.1"}
    `(
      "",
      ({
        ipAddress,
        netMask,
        dhcpEnabled,
        dhcpPoolStart,
        dhcpPoolEnd,
        dhcpGateway
      }) => {
        const config: IPv4Config = {
          IPAdress: ipAddress,
          netMask,
          DHCPServerEnabled: dhcpEnabled,
          DHCPPoolStart: dhcpPoolStart,
          DHCPPoolEnd: dhcpPoolEnd,
          DHCPGateway: dhcpGateway
        };
        const returnedConfig = createIPv4Config(
          ipAddress,
          netMask,
          dhcpEnabled,
          dhcpPoolStart,
          dhcpPoolEnd,
          dhcpGateway
        );
        expect(returnedConfig).toEqual(config);
      }
    );
  });
});
