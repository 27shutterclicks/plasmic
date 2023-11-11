// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: aaggSgVS8yYsAwQffVQB4p
// Component: 0O5nMBdoCe
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
import IconButton from "../../components/widgets/IconButton"; // plasmic-import: LPry-TF4j22a/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import projectcss from "../PP__plasmickit_settings.module.css"; // plasmic-import: aaggSgVS8yYsAwQffVQB4p/projectcss
import sty from "./PlasmicTrustedHost.module.css"; // plasmic-import: 0O5nMBdoCe/css

import Trash2SvgIcon from "../q_4_icons/icons/PlasmicIcon__Trash2Svg"; // plasmic-import: nS4_I75qv/icon
import ChevronDownsvgIcon from "../q_4_icons/icons/PlasmicIcon__ChevronDownsvg"; // plasmic-import: xZrB9_0ir/icon

export type PlasmicTrustedHost__VariantMembers = {};
export type PlasmicTrustedHost__VariantsArgs = {};
type VariantPropType = keyof PlasmicTrustedHost__VariantsArgs;
export const PlasmicTrustedHost__VariantProps = new Array<VariantPropType>();

export type PlasmicTrustedHost__ArgsType = {
  url?: React.ReactNode;
};

type ArgPropType = keyof PlasmicTrustedHost__ArgsType;
export const PlasmicTrustedHost__ArgProps = new Array<ArgPropType>("url");

export type PlasmicTrustedHost__OverridesType = {
  root?: p.Flex<"div">;
  freeBox?: p.Flex<"div">;
  deleteBtn?: p.Flex<typeof IconButton>;
  svg?: p.Flex<"svg">;
};

export interface DefaultTrustedHostProps {
  url?: React.ReactNode;
  className?: string;
}

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());
const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function PlasmicTrustedHost__RenderFunc(props: {
  variants: PlasmicTrustedHost__VariantsArgs;
  args: PlasmicTrustedHost__ArgsType;
  overrides: PlasmicTrustedHost__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const $ctx = ph.useDataEnv?.() || {};
  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);

  const $props = {
    ...args,
    ...variants,
  };

  const currentUser = p.useCurrentUser?.() || {};

  const [$queries, setDollarQueries] = React.useState({});

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
      <p.Stack
        as={"div"}
        data-plasmic-name={"freeBox"}
        data-plasmic-override={overrides.freeBox}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox)}
      >
        {p.renderPlasmicSlot({
          defaultContents: "https://my-app.com",
          value: args.url,
          className: classNames(sty.slotTargetUrl),
        })}
      </p.Stack>

      <IconButton
        data-plasmic-name={"deleteBtn"}
        data-plasmic-override={overrides.deleteBtn}
        className={classNames("__wab_instance", sty.deleteBtn)}
        withRedBackgroundHover={true}
      >
        <Trash2SvgIcon
          data-plasmic-name={"svg"}
          data-plasmic-override={overrides.svg}
          className={classNames(projectcss.all, sty.svg)}
          role={"img"}
        />
      </IconButton>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "freeBox", "deleteBtn", "svg"],
  freeBox: ["freeBox"],
  deleteBtn: ["deleteBtn", "svg"],
  svg: ["svg"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
  freeBox: "div";
  deleteBtn: typeof IconButton;
  svg: "svg";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTrustedHost__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTrustedHost__VariantsArgs;
    args?: PlasmicTrustedHost__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTrustedHost__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicTrustedHost__ArgsType,
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
          internalArgPropNames: PlasmicTrustedHost__ArgProps,
          internalVariantPropNames: PlasmicTrustedHost__VariantProps,
        }),

      [props, nodeName]
    );

    return PlasmicTrustedHost__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicTrustedHost";
  } else {
    func.displayName = `PlasmicTrustedHost.${nodeName}`;
  }
  return func;
}

export const PlasmicTrustedHost = Object.assign(
  // Top-level PlasmicTrustedHost renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    freeBox: makeNodeComponent("freeBox"),
    deleteBtn: makeNodeComponent("deleteBtn"),
    svg: makeNodeComponent("svg"),

    // Metadata about props expected for PlasmicTrustedHost
    internalVariantProps: PlasmicTrustedHost__VariantProps,
    internalArgProps: PlasmicTrustedHost__ArgProps,
  }
);

export default PlasmicTrustedHost;
/* prettier-ignore-end */