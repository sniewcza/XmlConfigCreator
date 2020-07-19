export class XmlConfigNavigator {
  private document: Document;
  private rootPath: string;

  constructor(document: Document, rootPath: string) {
    this.document = document;
    this.rootPath = rootPath;
    this.getNode(rootPath);
  }

  public getNode = (nodePath: string): Node => {
    const result = this.document.evaluate(
      nodePath,
      this.document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    const node = result.singleNodeValue;
    if (node === null) {
      throw new Error(` Path "${nodePath}" not found`);
    }
    return node;
  };

  public getWanConfigurableNodes = (wanName: string) => {
    const contextRootPath = `${this.rootPath}/WAN/${wanName}`;

    const activeNode = this.getNode(`${contextRootPath}/ACTIVE`);
    const modeNode = this.getNode(`${contextRootPath}/MODE`);
    const lan1Node = this.getNode(
      `${contextRootPath}/${wanName}_PORT_BINDING/LAN1`
    );
    const lan2Node = this.getNode(
      `${contextRootPath}/${wanName}_PORT_BINDING/LAN2`
    );
    const lan3Node = this.getNode(
      `${contextRootPath}/${wanName}_PORT_BINDING/LAN3`
    );
    const lan4Node = this.getNode(
      `${contextRootPath}/${wanName}_PORT_BINDING/LAN4`
    );
    const wlan_2_4g_node = this.getNode(
      `${contextRootPath}/${wanName}_PORT_BINDING/WLAN_2.4G_SSID1`
    );
    const wlan_5g_node = this.getNode(
      `${contextRootPath}/${wanName}_PORT_BINDING/WLAN_5G_SSID1`
    );
    const vlanIdNode = this.getNode(`${contextRootPath}/VLAN_ID`);
    const connectionTypeNode = this.getNode(
      `${contextRootPath}/CONNECTION_TYPE`
    );
    const cosNode = this.getNode(`${contextRootPath}/COS`);
    return {
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
    };
  };

  public getLanConfigurableNodes = (lanName: string) => {
    const contextRootPath = `${this.rootPath}/LAN/${lanName}`;
    const enableNode = this.getNode(`${contextRootPath}/ENABLE`);
    const modeNode = this.getNode(`${contextRootPath}/MODE`);

    return {
      enableNode,
      modeNode
    };
  };

  public getIPv4ConfigurableNodes = () => {
    const contextRootPath = `${this.rootPath}/LAN/LAN_IPv4`;
    const ipAddressNode = this.getNode(`${contextRootPath}/IP_ADDRESS`);
    const netMaskNode = this.getNode(`${contextRootPath}/NETMASK`);
    const dhcpEnabledNode = this.getNode(
      `${contextRootPath}/DHCP_SERVER_ENABLE`
    );
    const dhcpPollStartNode = this.getNode(
      `${contextRootPath}/DHCP_POOL_START`
    );
    const dhcpPoolEndNode = this.getNode(`${contextRootPath}/DHCP_POOL_STOP`);
    const dhcpGatewayNode = this.getNode(`${contextRootPath}/DHCP_GATEWAY`);

    return {
      ipAddressNode,
      netMaskNode,
      dhcpEnabledNode,
      dhcpPollStartNode,
      dhcpPoolEndNode,
      dhcpGatewayNode
    };
  };

  public getRateLimitConfigurableNodes = () => {
    const contextRootPath = `${this.rootPath}/RATELIMIT/COS0`;
    const downstreamNode = this.getNode(`${contextRootPath}/DOWNSTREAM`);
    const upstreamNode = this.getNode(`${contextRootPath}/UPSTREAM`);

    return {
      downstreamNode,
      upstreamNode
    };
  };

  public getSIPAccountConfigurableNodes = (sipAccountNumber: number) => {
    const sipAccountSufix = `VOIP_SIP${sipAccountNumber}_ACCOUNT`;
    const contextRootPath = `${this.rootPath}/VOIP/${sipAccountSufix}`;
    const accountEnableNode = this.getNode(
      `${contextRootPath}/${sipAccountSufix}_ENABLE`
    );
    const phoneNumberNode = this.getNode(
      `${contextRootPath}/${sipAccountSufix}_NUMBER`
    );
    const displayNameNode = this.getNode(
      `${contextRootPath}/${sipAccountSufix}_DISPLAY_NAME`
    );
    const userNameNode = this.getNode(
      `${contextRootPath}/${sipAccountSufix}_USERNAME`
    );
    const passwordNode = this.getNode(
      `${contextRootPath}/${sipAccountSufix}_PASSWORD`
    );

    return {
      accountEnableNode,
      phoneNumberNode,
      displayNameNode,
      userNameNode,
      passwordNode
    };
  };
}
