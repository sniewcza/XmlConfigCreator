import { Template } from "../model/XmlConfigTemplate";

describe("Xml parser and template tests", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(Template, "text/xml");
  test("Should parse string template to valid xml document", () => {
    expect(document).not.toBeNull();
  });

  test("Should have root element name HALNyUniversalProvisioning", () => {
    expect(document.documentElement.nodeName).toEqual(
      "HALNyUniversalProvisioning"
    );
  });

  test("Should have node with name HALNyConfiguration", () => {
    const result = document.evaluate(
      "//HALNyUniversalProvisioning/HALNyConfiguration",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    expect(result.singleNodeValue).not.toBeNull();
    expect(result.singleNodeValue.nodeName).toEqual("HALNyConfiguration");
  });
});
