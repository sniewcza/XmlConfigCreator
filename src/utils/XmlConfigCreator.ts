import { WanConfig } from "../model/WanConfig";
import { Template } from "../model/XmlConfigTemplate";
import { XmlConfigNavigator } from "../utils/XmlConfigNavigator";
import { LanConfig } from "../model/LanConfig";
import { IPv4Config } from "../model/IPv4Config";
import { RateLimitConfig } from "../model/RateLimitConfig";
import { SIPAccountConfig } from "../model/SIPAccountConfig";

export class XmlConfigCreator {
  private configXml: Document;
  private rootPath = "//HALNyUniversalProvisioning/HALNyConfiguration";
  private navigator: XmlConfigNavigator;
  constructor() {
    const parser = new DOMParser();
    this.configXml = parser.parseFromString(Template, "text/xml");
    this.navigator = new XmlConfigNavigator(this.configXml, this.rootPath);
  }

  public boolToConfig = (value: boolean): string => {
    return value ? "YES" : "NO";
  };

  public embedWanConfig = (config: WanConfig, wanName: string): Document => {
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
    } = this.navigator.getWanConfigurableNodes(wanName);

    activeNode.textContent = this.boolToConfig(config.active);
    modeNode.textContent = config.mode;
    lan1Node.textContent = this.boolToConfig(config.lan1Enabled);
    lan2Node.textContent = this.boolToConfig(config.lan2Enabled);
    lan3Node.textContent = this.boolToConfig(config.lan3Enabled);
    lan4Node.textContent = this.boolToConfig(config.lan4Enabled);
    wlan_2_4g_node.textContent = this.boolToConfig(config.wlan2_4GEnabled);
    wlan_5g_node.textContent = this.boolToConfig(config.wlan5GEnabled);
    vlanIdNode.textContent =
      config.vlanId !== undefined ? `${config.vlanId}` : null;
    connectionTypeNode.textContent =
      config.connectionType !== undefined ? `${config.connectionType}` : null;
    cosNode.textContent = config.cos !== undefined ? `${config.cos}` : null;
    return this.configXml;
  };

  public embedLanConfig = (config: LanConfig, lanName: string) => {
    const { enableNode, modeNode } = this.navigator.getLanConfigurableNodes(
      lanName
    );
    enableNode.textContent = this.boolToConfig(config.enabled);
    modeNode.textContent = config.mode;

    return this.configXml;
  };

  public embedIPv4Config = (config: IPv4Config) => {
    const {
      ipAddressNode,
      netMaskNode,
      dhcpEnabledNode,
      dhcpPollStartNode,
      dhcpPoolEndNode,
      dhcpGatewayNode
    } = this.navigator.getIPv4ConfigurableNodes();

    ipAddressNode.textContent = config.IPAdress;
    netMaskNode.textContent = config.netMask;
    dhcpEnabledNode.textContent = this.boolToConfig(config.DHCPServerEnabled);
    dhcpPollStartNode.textContent = config.DHCPPoolStart || null;
    dhcpPoolEndNode.textContent = config.DHCPPoolEnd || null;
    dhcpGatewayNode.textContent = config.DHCPGateway || null;

    return this.configXml
  };

  public embedRateLimitConfig = (config: RateLimitConfig) => {
    const {
      downstreamNode,
      upstreamNode
    } = this.navigator.getRateLimitConfigurableNodes();

    downstreamNode.textContent = `${config.downStream}`;
    upstreamNode.textContent = `${config.upStream}`;

    return this.configXml;
  };

  public embedSIPAccountConfig = (
    config: SIPAccountConfig,
    accountNumber: number
  ) => {
    const {
      accountEnableNode,
      phoneNumberNode,
      displayNameNode,
      userNameNode,
      passwordNode
    } = this.navigator.getSIPAccountConfigurableNodes(accountNumber);

    accountEnableNode.textContent = this.boolToConfig(config.enabled);
    phoneNumberNode.textContent = config.accountPhoneNumber;
    displayNameNode.textContent = config.displayName;
    userNameNode.textContent = config.userName;
    passwordNode.textContent = config.password;

    return this.configXml;
  };
}
