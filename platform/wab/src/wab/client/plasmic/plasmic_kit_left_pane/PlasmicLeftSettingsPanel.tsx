// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: aukbrhkegRkQ6KizvhdUPT
// Component: EeT-6P6YTW

import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/react-web/lib/host";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants,
} from "@plasmicapp/react-web";
import LeftSearchPanel from "../../components/studio/LeftSearchPanel"; // plasmic-import: TqAPn0srTq/component
import LeftPaneHeader from "../../components/studio/LeftPaneHeader"; // plasmic-import: XLa52PvduIy/component
import TextWithInfo from "../../../../TextWithInfo"; // plasmic-import: -EsDm7v023/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_deprecated_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import plasmic_plasmic_kit_new_design_system_former_style_controls_css from "../plasmic_kit_style_controls/plasmic_plasmic_kit_styles_pane.module.css"; // plasmic-import: gYEVvAzCcLMHDVPvuYxkFh/projectcss
import projectcss from "../PP__plasmickit_left_pane.module.css"; // plasmic-import: aukbrhkegRkQ6KizvhdUPT/projectcss
import sty from "./PlasmicLeftSettingsPanel.module.css"; // plasmic-import: EeT-6P6YTW/css

createPlasmicElementProxy;

export type PlasmicLeftSettingsPanel__VariantMembers = {};
export type PlasmicLeftSettingsPanel__VariantsArgs = {};
type VariantPropType = keyof PlasmicLeftSettingsPanel__VariantsArgs;
export const PlasmicLeftSettingsPanel__VariantProps =
  new Array<VariantPropType>();

export type PlasmicLeftSettingsPanel__ArgsType = {};
type ArgPropType = keyof PlasmicLeftSettingsPanel__ArgsType;
export const PlasmicLeftSettingsPanel__ArgProps = new Array<ArgPropType>();

export type PlasmicLeftSettingsPanel__OverridesType = {
  root?: p.Flex<"div">;
  leftSearchPanel?: p.Flex<typeof LeftSearchPanel>;
  leftPaneHeader?: p.Flex<typeof LeftPaneHeader>;
  text?: p.Flex<"div">;
  content?: p.Flex<"div">;
  globalVariableContent?: p.Flex<"div">;
};

export interface DefaultLeftSettingsPanelProps {
  className?: string;
}

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());
const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function PlasmicLeftSettingsPanel__RenderFunc(props: {
  variants: PlasmicLeftSettingsPanel__VariantsArgs;
  args: PlasmicLeftSettingsPanel__ArgsType;
  overrides: PlasmicLeftSettingsPanel__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);

  const $props = {
    ...args,
    ...variants,
  };

  const $ctx = ph.useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = p.useCurrentUser?.() || {};

  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_plasmic_kit_design_system_deprecated_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        plasmic_plasmic_kit_new_design_system_former_style_controls_css.plasmic_tokens,
        sty.root
      )}
    >
      <LeftSearchPanel
        data-plasmic-name={"leftSearchPanel"}
        data-plasmic-override={overrides.leftSearchPanel}
        className={classNames("__wab_instance", sty.leftSearchPanel)}
      />

      <LeftPaneHeader
        data-plasmic-name={"leftPaneHeader"}
        data-plasmic-override={overrides.leftPaneHeader}
        actions={null}
        className={classNames("__wab_instance", sty.leftPaneHeader)}
        description={
          <div
            data-plasmic-name={"text"}
            data-plasmic-override={overrides.text}
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.text
            )}
          >
            {
              'These are the settings ("global contexts") available for you to configure in this project.'
            }
          </div>
        }
        title={"Project Settings"}
      />

      <div
        data-plasmic-name={"content"}
        data-plasmic-override={overrides.content}
        className={classNames(projectcss.all, sty.content)}
      />

      <div
        data-plasmic-name={"globalVariableContent"}
        data-plasmic-override={overrides.globalVariableContent}
        className={classNames(projectcss.all, sty.globalVariableContent)}
      />
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "leftSearchPanel",
    "leftPaneHeader",
    "text",
    "content",
    "globalVariableContent",
  ],
  leftSearchPanel: ["leftSearchPanel"],
  leftPaneHeader: ["leftPaneHeader", "text"],
  text: ["text"],
  content: ["content"],
  globalVariableContent: ["globalVariableContent"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  leftSearchPanel: typeof LeftSearchPanel;
  leftPaneHeader: typeof LeftPaneHeader;
  text: "div";
  content: "div";
  globalVariableContent: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicLeftSettingsPanel__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicLeftSettingsPanel__VariantsArgs;
    args?: PlasmicLeftSettingsPanel__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicLeftSettingsPanel__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicLeftSettingsPanel__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicLeftSettingsPanel__ArgProps,
          internalVariantPropNames: PlasmicLeftSettingsPanel__VariantProps,
        }),
      [props, nodeName]
    );
    return PlasmicLeftSettingsPanel__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicLeftSettingsPanel";
  } else {
    func.displayName = `PlasmicLeftSettingsPanel.${nodeName}`;
  }
  return func;
}

export const PlasmicLeftSettingsPanel = Object.assign(
  // Top-level PlasmicLeftSettingsPanel renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    leftSearchPanel: makeNodeComponent("leftSearchPanel"),
    leftPaneHeader: makeNodeComponent("leftPaneHeader"),
    text: makeNodeComponent("text"),
    content: makeNodeComponent("content"),
    globalVariableContent: makeNodeComponent("globalVariableContent"),

    // Metadata about props expected for PlasmicLeftSettingsPanel
    internalVariantProps: PlasmicLeftSettingsPanel__VariantProps,
    internalArgProps: PlasmicLeftSettingsPanel__ArgProps,
  }
);

export default PlasmicLeftSettingsPanel;
/* prettier-ignore-end */
