import { XmlConfigCreator } from "../utils/XmlConfigCreator";
import { XmlConfigNavigator } from "../utils/XmlConfigNavigator";
import { Template } from "../model/XmlConfigTemplate";
import { WanConfig } from "../model/WanConfig";
import { LanConfig } from "../model/LanConfig";
import { IPv4Config } from "../model/IPv4Config";
import { RateLimitConfig } from "../model/RateLimitConfig";
import { SIPAccountConfig } from "../model/SIPAccountConfig";

const wanConfig1: WanConfig = {
  active: false,
  mode: "BRIDGE",
  lan1Enabled: true,
  lan2Enabled: true,
  lan3Enabled: false,
  lan4Enabled: false,
  wlan2_4GEnabled: true,
  wlan5GEnabled: true,
};
const wanConfig2: WanConfig = {
  active: true,
  mode: "ROUTER",
  lan1Enabled: true,
  lan2Enabled: true,
  lan3Enabled: true,
  lan4Enabled: true,
  wlan2_4GEnabled: true,
  wlan5GEnabled: true,
  vlanId: 300,
  connectionType: "DHCP",
  cos: 1,
};
const wanConfig3: WanConfig = {
  active: true,
  mode: "ROUTER",
  lan1Enabled: true,
  lan2Enabled: true,
  lan3Enabled: true,
  lan4Enabled: true,
  wlan2_4GEnabled: true,
  wlan5GEnabled: true,
};

const lanConfig1: LanConfig = {
  enabled: true,
  mode: "AUTO",
};

const lanConfig2: LanConfig = {
  enabled: true,
  mode: "AUTO",
};

const IPv4Config1: IPv4Config = {
  IPAdress: "192.168.1.1",
  netMask: "255.255.255.0",
  DHCPServerEnabled: false,
};

const IPv4Config2: IPv4Config = {
  IPAdress: "192.168.1.1",
  netMask: "255.255.255.0",
  DHCPServerEnabled: true,
  DHCPPoolStart: "192.168.1.100",
  DHCPPoolEnd: "192.168.1.200",
  DHCPGateway: "192.168.1.1",
};

const rateLimitConfig1: RateLimitConfig = {
  downStream: 50,
  upStream: 10,
};

const sipAccountConfig: SIPAccountConfig = {
  accountPhoneNumber: "123456789",
  enabled: true,
  displayName: "Test",
  userName: "User",
  password: "1234",
};

describe("XmlConfigCreator tests", () => {
  const creator = new XmlConfigCreator();
  const rootPath = "//HALNyUniversalProvisioning/HALNyConfiguration";

  test.each`
    config        | wanName
    ${wanConfig1} | ${"WAN1"}
    ${wanConfig2} | ${"WAN2"}
    ${wanConfig3} | ${"WAN3"}
  `(
    "Should should embed WanConfig in XmlDocument and return modified document",
    ({ config, wanName }: { config: WanConfig; wanName: string }) => {
      const modifiedDocument = creator.embedWanConfig(config, wanName);
      const navigator = new XmlConfigNavigator(modifiedDocument, rootPath);
      const {
        activeNode,
        modeNode,
        lan1Node,
        lan2Node,
        lan3Node,
        lan4Node,
        wlan_2_4g_node,
        wlan_5g_node,
        vlanIdNode,
        connectionTypeNode,
        cosNode,
      } = navigator.getWanConfigurableNodes(wanName);

      expect(activeNode.textContent).toEqual(
        creator.boolToConfig(config.active)
      );
      expect(modeNode.textContent).toEqual(config.mode);
      expect(lan1Node.textContent).toEqual(
        creator.boolToConfig(config.lan1Enabled)
      );
      expect(lan2Node.textContent).toEqual(
        creator.boolToConfig(config.lan2Enabled)
      );
      expect(lan3Node.textContent).toEqual(
        creator.boolToConfig(config.lan3Enabled)
      );
      expect(lan4Node.textContent).toEqual(
        creator.boolToConfig(config.lan4Enabled)
      );
      expect(wlan_2_4g_node.textContent).toEqual(
        creator.boolToConfig(config.wlan2_4GEnabled)
      );
      expect(wlan_5g_node.textContent).toEqual(
        creator.boolToConfig(config.wlan5GEnabled)
      );
      expect(vlanIdNode.textContent).toEqual(config.vlanId?.toString() || "");
      expect(connectionTypeNode.textContent).toEqual(
        config.connectionType || ""
      );
      expect(cosNode.textContent).toEqual(config.cos?.toString() || "");
    }
  );

  test.each`
    config        | lanName
    ${lanConfig1} | ${"LAN1"}
    ${lanConfig2} | ${"LAN2"}
  `(
    "Should should embed LanConfig in XmlDocument and return modified document",
    ({ config, lanName }: { config: LanConfig; lanName: string }) => {
      const modifiedDocument = creator.embedLanConfig(config, lanName);
      const navigator = new XmlConfigNavigator(modifiedDocument, rootPath);
      const { enableNode, modeNode } = navigator.getLanConfigurableNodes(
        lanName
      );
      expect(enableNode.textContent).toEqual(
        creator.boolToConfig(config.enabled)
      );
      expect(modeNode.textContent).toEqual(config.mode);
    }
  );

  test.each`
    config
    ${IPv4Config1}
    ${IPv4Config2}
  `(
    "Should should embed IPv4Config in XmlDocument and return modified document",
    ({ config }: { config: IPv4Config }) => {
      const modifiedDocument = creator.embedIPv4Config(config);
      const navigator = new XmlConfigNavigator(modifiedDocument, rootPath);
      const {
        ipAddressNode,
        netMaskNode,
        dhcpEnabledNode,
        dhcpPollStartNode,
        dhcpPoolEndNode,
        dhcpGatewayNode,
      } = navigator.getIPv4ConfigurableNodes();
      expect(ipAddressNode.textContent).toEqual(config.IPAdress);
      expect(netMaskNode.textContent).toEqual(config.netMask);
      expect(dhcpEnabledNode.textContent).toEqual(
        creator.boolToConfig(config.DHCPServerEnabled)
      );
      expect(dhcpPollStartNode.textContent).toEqual(config.DHCPPoolStart || "");
      expect(dhcpPoolEndNode.textContent).toEqual(config.DHCPPoolEnd || "");
      expect(dhcpGatewayNode.textContent).toEqual(config.DHCPGateway || "");
    }
  );

  test.each`
    config
    ${rateLimitConfig1}
  `(
    "Should should embed RateLimitConfig in XmlDocument and return modified document",
    ({ config }: { config: RateLimitConfig }) => {
      const modifiedDocument = creator.embedRateLimitConfig(config);
      const navigator = new XmlConfigNavigator(modifiedDocument, rootPath);
      const {
        downstreamNode,
        upstreamNode,
      } = navigator.getRateLimitConfigurableNodes();
      expect(downstreamNode.textContent).toEqual(config.downStream.toString());
      expect(upstreamNode.textContent).toEqual(config.upStream.toString());
    }
  );

  test.each`
    config              | accountNumber
    ${sipAccountConfig} | ${1}
    ${sipAccountConfig} | ${2}
  `(
    "Should should embed SIPAccountConfig in XmlDocument and return modified document",
    ({
      config,
      accountNumber,
    }: {
      config: SIPAccountConfig;
      accountNumber: number;
    }) => {
      const modifiedDocument = creator.embedSIPAccountConfig(
        config,
        accountNumber
      );
      const navigator = new XmlConfigNavigator(modifiedDocument, rootPath);
      const {
        accountEnableNode,
        phoneNumberNode,
        displayNameNode,
        userNameNode,
        passwordNode,
      } = navigator.getSIPAccountConfigurableNodes(accountNumber);
      expect(accountEnableNode.textContent).toEqual(
        creator.boolToConfig(config.enabled)
      );
      expect(phoneNumberNode.textContent).toEqual(config.accountPhoneNumber);
      expect(displayNameNode.textContent).toEqual(config.displayName);
      expect(userNameNode.textContent).toEqual(config.userName);
      expect(passwordNode.textContent).toEqual(config.password);
    }
  );
});
