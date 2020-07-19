import { Template } from "../model/XmlConfigTemplate";
import { XmlConfigNavigator } from "../utils/XmlConfigNavigator";

describe("Xml config navigator tests", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(Template, "text/xml");
  const rootPath = "//HALNyUniversalProvisioning/HALNyConfiguration";
  const navigator = new XmlConfigNavigator(document, rootPath);

  test("Should throw exception when node dont exists", () => {
    const fn = () => {
      navigator.getNode("DefinitelyNotExistingNode");
    };
    expect(fn).toThrowError(/not found/);
  });

  test.each([
    [`${rootPath}/WAN/WAN1`, "WAN1"],
    [`${rootPath}/LAN`, "LAN"],
    [`${rootPath}/LAN/LAN_IPv4`, "LAN_IPv4"],
    [`${rootPath}/RATELIMIT`, "RATELIMIT"]
  ])("Should return %s node", (nodePath: string, nodeName: string) => {
    const node = navigator.getNode(nodePath);
    expect(node.nodeName).toEqual(nodeName);
  });

  test.each(["WAN1", "WAN2", "WAN3", "WAN4"])(
    "Should return %s node",
    wanName => {
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
        cosNode
      } = navigator.getWanConfigurableNodes(wanName);

      expect(activeNode.nodeName).toEqual("ACTIVE");
      expect(modeNode.nodeName).toEqual("MODE");
      expect(lan1Node.nodeName).toEqual("LAN1");
      expect(lan2Node.nodeName).toEqual("LAN2");
      expect(lan3Node.nodeName).toEqual("LAN3");
      expect(lan4Node.nodeName).toEqual("LAN4");
      expect(wlan_2_4g_node.nodeName).toEqual("WLAN_2.4G_SSID1");
      expect(wlan_5g_node.nodeName).toEqual("WLAN_5G_SSID1");
      expect(vlanIdNode.nodeName).toEqual("VLAN_ID");
      expect(connectionTypeNode.nodeName).toEqual("CONNECTION_TYPE");
      expect(cosNode.nodeName).toEqual("COS");
    }
  );

  test.each(["LAN1", "LAN2", "LAN3", "LAN4"])(
    "Should return %s node",
    (lanName: string) => {
      const { enableNode, modeNode } = navigator.getLanConfigurableNodes(
        lanName
      );
      expect(enableNode.nodeName).toEqual("ENABLE");
      expect(modeNode.nodeName).toEqual("MODE");
    }
  );

  test("Should return IPv4 node", () => {
    const {
      ipAddressNode,
      netMaskNode,
      dhcpEnabledNode,
      dhcpPollStartNode,
      dhcpPoolEndNode,
      dhcpGatewayNode
    } = navigator.getIPv4ConfigurableNodes();

    expect(ipAddressNode.nodeName).toEqual("IP_ADDRESS");
    expect(netMaskNode.nodeName).toEqual("NETMASK");
    expect(dhcpEnabledNode.nodeName).toEqual("DHCP_SERVER_ENABLE");
    expect(dhcpPollStartNode.nodeName).toEqual("DHCP_POOL_START");
    expect(dhcpPoolEndNode.nodeName).toEqual("DHCP_POOL_STOP");
    expect(dhcpGatewayNode.nodeName).toEqual("DHCP_GATEWAY");
  });

  test("Should return rate limit node", () => {
    const {
      downstreamNode,
      upstreamNode
    } = navigator.getRateLimitConfigurableNodes();

    expect(downstreamNode.nodeName).toEqual("DOWNSTREAM");
    expect(upstreamNode.nodeName).toEqual("UPSTREAM");
  });

  test.each([1, 2])("Should return SIP%d node", (accountNumber: number) => {
    const {
      accountEnableNode,
      phoneNumberNode,
      displayNameNode,
      userNameNode,
      passwordNode
    } = navigator.getSIPAccountConfigurableNodes(accountNumber);

    expect(accountEnableNode.nodeName).toEqual(
      `VOIP_SIP${accountNumber}_ACCOUNT_ENABLE`
    );
    expect(phoneNumberNode.nodeName).toEqual(
      `VOIP_SIP${accountNumber}_ACCOUNT_NUMBER`
    );
    expect(displayNameNode.nodeName).toEqual(
      `VOIP_SIP${accountNumber}_ACCOUNT_DISPLAY_NAME`
    );
    expect(userNameNode.nodeName).toEqual(
      `VOIP_SIP${accountNumber}_ACCOUNT_USERNAME`
    );
    expect(passwordNode.nodeName).toEqual(
      `VOIP_SIP${accountNumber}_ACCOUNT_PASSWORD`
    );
  });
});
