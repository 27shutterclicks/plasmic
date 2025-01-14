import "jest-extended";
import {
  isKnownVariantsRef,
  RuleSet,
  TplTag,
  Variant,
  VariantSetting,
} from "../classes";
import { tuple } from "../common";
import { ComponentType, extractComponent } from "../components";
import { tryExtractJson } from "../exprs";
import { RuleSetHelpers } from "../shared/RuleSetHelpers";
import { assertSiteInvariants } from "../shared/site-invariants";
import { TplMgr } from "../shared/TplMgr";
import { $$$ } from "../shared/TplQuery";
import {
  getBaseVariant,
  isPrivateStyleVariant,
  isStyleVariant,
  mkVariantSetting,
} from "../shared/Variants";
import { createSite } from "../sites";
import { mkTplTagX } from "../tpls";

describe("extractComponent", () => {
  const site = createSite();
  const tplMgr = new TplMgr({ site });
  const component = tplMgr.addComponent({
    name: "TestComponent",
    type: ComponentType.Plain,
  });
  component.name = "Outer";
  const base = getBaseVariant(component);
  const typeGroup = tplMgr.createVariantGroup({
    component: component,
    name: "type",
  });
  const primary = tplMgr.createVariant(component, typeGroup, "primary");
  const secondary = tplMgr.createVariant(component, typeGroup, "secondary");
  const sizeGroup = tplMgr.createVariantGroup({
    component: component,
    name: "size",
  });
  const large = tplMgr.createVariant(component, sizeGroup, "large");
  const small = tplMgr.createVariant(component, sizeGroup, "small");
  const flavorGroup = tplMgr.createVariantGroup({
    component: component,
    name: "flavor",
  });
  const spicey = tplMgr.createVariant(component, flavorGroup, "spicey");
  const mild = tplMgr.createVariant(component, flavorGroup, "mild");

  const hover = tplMgr.createStyleVariant(component, ["Hover"]);

  const root = component.tplTree! as TplTag;
  root.vsettings.push(
    mkVariantSetting({
      variants: [primary],
      styles: { background: "linear-gradient(blue, blue)" },
    }),
    mkVariantSetting({
      variants: [hover],
      styles: { background: "linear-gradient(silver, silver)" },
    }),
    mkVariantSetting({
      variants: [large],
      styles: { "padding-left": "20px" },
    })
  );

  const tree1 = mkTplTagX(
    "div",
    {
      baseVariant: base,
      variants: [
        mkVariantSetting({
          variants: [base],
          styles: {},
        }),
        mkVariantSetting({
          variants: [hover],
          styles: { background: "linear-gradient(steel, steel)" },
        }),
        mkVariantSetting({
          variants: [primary],
          styles: {
            background: "linear-gradient(blue-pink, blue-pink)",
          },
        }),
        mkVariantSetting({
          variants: [primary, large],
          styles: {
            background: "linear-gradient(blue-purple, blue-purple)",
          },
        }),
        mkVariantSetting({
          variants: [primary, hover],
          styles: {
            background: "linear-gradient(blue-yellow, blue-yellow)",
          },
        }),
        mkVariantSetting({
          variants: [spicey],
        }),
      ],
    },
    mkTplTagX("input", {
      baseVariant: base,
      variants: [
        mkVariantSetting({
          variants: [base],
        }),
        mkVariantSetting({
          variants: [primary],
          styles: { "font-weight": "strong" },
        }),
        mkVariantSetting({
          variants: [secondary, hover],
          styles: { "font-style": "italic" },
        }),
        mkVariantSetting({
          variants: [large],
          styles: { "font-size": "20px" },
        }),
        mkVariantSetting({
          variants: [mild, hover],
        }),
      ],
    })
  );

  const input = tree1.children[0] as TplTag;
  input.vsettings.push(
    mkVariantSetting({
      variants: [tplMgr.createPrivateStyleVariant(component, input, ["Hover"])],
      styles: { "font-weight": "bold" },
    })
  );

  $$$(root).append(tree1);

  const rulesetToStyles = (rs: RuleSet) => {
    const rsh = new RuleSetHelpers(rs, "div");
    return Object.fromEntries(rsh.props().map((p) => tuple(p, rsh.get(p))));
  };

  const simpleStyles = (vs: VariantSetting) => ({
    variants: vs.variants.map(variantName),
    styles: rulesetToStyles(vs.rs),
  });

  const simpleArgs = (vs: VariantSetting) => ({
    ...simpleStyles(vs),
    args: Object.fromEntries(
      vs.args.map((arg) =>
        tuple(
          arg.param.variable.name,
          isKnownVariantsRef(arg.expr)
            ? arg.expr.variants.map((v) => v.uuid)
            : tryExtractJson(arg.expr)
        )
      )
    ),
  });

  const variantName = (variant: Variant) => {
    if (isPrivateStyleVariant(variant)) {
      return `:private:${variant.selectors!.join(":")}`;
    } else if (isStyleVariant(variant)) {
      return `:${variant.selectors!.join(":")}`;
    } else {
      return variant.name;
    }
  };

  it("should extract necessary variants", () => {
    const tpl = extractComponent({
      site,
      name: "Inner",
      containingComponent: component,
      tpl: tree1,
      tplMgr: new TplMgr({ site }),
      getCanvasEnvForTpl: () => undefined,
    });
    tplMgr.attachComponent(tpl.component);

    const inner = tpl.component;
    expect(inner.variants.map(variantName)).toEqual([
      "base",
      ":Hover",
      ":private:Hover",
    ]);
    expect(inner.variantGroups.map((g) => g.param.variable.name)).toEqual([
      "type",
      "size",
    ]);
    expect(inner.variantGroups[0].variants.map(variantName)).toEqual([
      "primary",
      "secondary",
    ]);
    expect(inner.variantGroups[1].variants.map(variantName)).toEqual([
      "large",
      "small",
    ]);
    const [newBase, newHover, newPrivateInputHover] = inner.variants;
    const [newPrimary, newSecondary] = inner.variantGroups[0].variants;
    const [newLarge, newSmall] = inner.variantGroups[1].variants;
    expect([
      newBase,
      newHover,
      newPrimary,
      newSecondary,
      newLarge,
      newSmall,
    ]).not.toEqual([base, hover, primary, secondary, large, small]);
    expect((inner.tplTree as TplTag).vsettings.map(simpleStyles)).toEqual([
      {
        variants: ["base"],
        styles: { position: "relative" },
      },
      {
        variants: [":Hover"],
        styles: { background: "linear-gradient(steel, steel)" },
      },
      {
        variants: ["primary"],
        styles: { background: "linear-gradient(blue-pink, blue-pink)" },
      },
      {
        variants: ["primary", "large"],
        styles: {
          background: "linear-gradient(blue-purple, blue-purple)",
        },
      },
      {
        variants: ["primary", ":Hover"],
        styles: {
          background: "linear-gradient(blue-yellow, blue-yellow)",
        },
      },
      {
        // from ensureBaseRuleVariantSetting() for the input
        variants: ["secondary"],
        styles: {},
      },
    ]);
    const innerInput = (inner.tplTree as TplTag).children[0] as TplTag;
    expect(innerInput.tag).toEqual("input");
    expect(innerInput.vsettings.map(simpleStyles)).toIncludeSameMembers([
      {
        variants: ["base"],
        styles: {},
      },
      {
        variants: ["primary"],
        styles: { "font-weight": "strong" },
      },
      {
        // from ensureBaseRuleVariantSetting()
        variants: ["secondary"],
        styles: {},
      },
      {
        variants: ["secondary", ":Hover"],
        styles: { "font-style": "italic" },
      },
      {
        variants: ["large"],
        styles: { "font-size": "20px" },
      },
      {
        variants: [":private:Hover"],
        styles: { "font-weight": "bold" },
      },
    ]);

    expect(tpl.vsettings.map(simpleArgs)).toIncludeSameMembers([
      {
        variants: ["base"],
        styles: { width: "default", height: "default" },
        args: {},
      },
      {
        variants: ["primary"],
        styles: {},
        args: { type: [newPrimary.uuid] },
      },
      {
        variants: ["primary", "large"],
        styles: {},
        args: { type: [newPrimary.uuid], size: [newLarge.uuid] },
      },
      {
        variants: ["spicey"],
        styles: {},
        args: {},
      },
      {
        variants: ["secondary"],
        styles: {},
        args: { type: [newSecondary.uuid] },
      },
      {
        variants: ["large"],
        styles: {},
        args: { size: [newLarge.uuid] },
      },
    ]);

    assertSiteInvariants(site);
  });
});
