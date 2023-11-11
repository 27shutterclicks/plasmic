// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: fQPf2UiMEMhB52C8QQXwWe
// Component: hrLkFMfsYv
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/host";

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

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import projectcss from "./plasmic_plasmic_kit_omnibar.module.css"; // plasmic-import: fQPf2UiMEMhB52C8QQXwWe/projectcss
import sty from "./PlasmicOmnibarTabHeader.module.css"; // plasmic-import: hrLkFMfsYv/css

export type PlasmicOmnibarTabHeader__VariantMembers = {
  selected: "selected";
};

export type PlasmicOmnibarTabHeader__VariantsArgs = {
  selected?: SingleBooleanChoiceArg<"selected">;
};

type VariantPropType = keyof PlasmicOmnibarTabHeader__VariantsArgs;
export const PlasmicOmnibarTabHeader__VariantProps = new Array<VariantPropType>(
  "selected"
);

export type PlasmicOmnibarTabHeader__ArgsType = {
  title?: React.ReactNode;
};

type ArgPropType = keyof PlasmicOmnibarTabHeader__ArgsType;
export const PlasmicOmnibarTabHeader__ArgProps = new Array<ArgPropType>(
  "title"
);

export type PlasmicOmnibarTabHeader__OverridesType = {
  root?: p.Flex<"div">;
};

export interface DefaultOmnibarTabHeaderProps {
  title?: React.ReactNode;
  selected?: SingleBooleanChoiceArg<"selected">;
  className?: string;
}

function PlasmicOmnibarTabHeader__RenderFunc(props: {
  variants: PlasmicOmnibarTabHeader__VariantsArgs;
  args: PlasmicOmnibarTabHeader__ArgsType;
  overrides: PlasmicOmnibarTabHeader__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const $ctx = ph.useDataEnv?.() || {};
  const args = React.useMemo(
    () =>
      Object.assign(
        {},

        props.args
      ),

    [props.args]
  );

  const $props = {
    ...args,
    ...variants,
  };

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
        plasmic_plasmic_kit_design_system_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        sty.root
      )}
    >
      {p.renderPlasmicSlot({
        defaultContents: "All",
        value: args.title,
        className: classNames(sty.slotTargetTitle, {
          [sty.slotTargetTitleselected]: hasVariant(
            variants,
            "selected",
            "selected"
          ),
        }),
      })}
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicOmnibarTabHeader__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> = {
  // Explicitly specify variants, args, and overrides as objects
  variants?: PlasmicOmnibarTabHeader__VariantsArgs;
  args?: PlasmicOmnibarTabHeader__ArgsType;
  overrides?: NodeOverridesType<T>;
} & Omit<PlasmicOmnibarTabHeader__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
  // Specify args directly as props
  Omit<PlasmicOmnibarTabHeader__ArgsType, ReservedPropsType> &
  // Specify overrides for each element directly as props
  Omit<
    NodeOverridesType<T>,
    ReservedPropsType | VariantPropType | ArgPropType
  > &
  // Specify props for the root element
  Omit<
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
          internalArgPropNames: PlasmicOmnibarTabHeader__ArgProps,
          internalVariantPropNames: PlasmicOmnibarTabHeader__VariantProps,
        }),

      [props, nodeName]
    );

    return PlasmicOmnibarTabHeader__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicOmnibarTabHeader";
  } else {
    func.displayName = `PlasmicOmnibarTabHeader.${nodeName}`;
  }
  return func;
}

export const PlasmicOmnibarTabHeader = Object.assign(
  // Top-level PlasmicOmnibarTabHeader renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements

    // Metadata about props expected for PlasmicOmnibarTabHeader
    internalVariantProps: PlasmicOmnibarTabHeader__VariantProps,
    internalArgProps: PlasmicOmnibarTabHeader__ArgProps,
  }
);

export default PlasmicOmnibarTabHeader;
/* prettier-ignore-end */