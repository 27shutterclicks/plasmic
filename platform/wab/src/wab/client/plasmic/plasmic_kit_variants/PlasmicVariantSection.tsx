// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: wT5BWZPEc2fYxyqbTLXMt2
// Component: PDpx0GMKsd
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
import MenuButton from "../../components/widgets/MenuButton"; // plasmic-import: h69wHrrKtL/component
import IconButton from "../../components/widgets/IconButton"; // plasmic-import: LPry-TF4j22a/component
import Button from "../../components/widgets/Button"; // plasmic-import: SEF-sRmSoqV5c/component
import VariantRow from "../../components/variants/VariantRow"; // plasmic-import: ZAqVPmZmi-/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import projectcss from "./plasmic_plasmic_kit_variants.module.css"; // plasmic-import: wT5BWZPEc2fYxyqbTLXMt2/projectcss
import sty from "./PlasmicVariantSection.module.css"; // plasmic-import: PDpx0GMKsd/css

import VariantGroupIcon from "../plasmic_kit/PlasmicIcon__VariantGroup"; // plasmic-import: pyS6pK4Spx-QF/icon
import GearIcon from "../plasmic_kit/PlasmicIcon__Gear"; // plasmic-import: ZmVZmXEc9f_SR/icon
import ChevronDownsvgIcon from "../q_4_icons/icons/PlasmicIcon__ChevronDownsvg"; // plasmic-import: xZrB9_0ir/icon
import CodeIcon from "../plasmic_kit/PlasmicIcon__Code"; // plasmic-import: sVrc1aLRLGQtV/icon
import PlusIcon from "../plasmic_kit/PlasmicIcon__Plus"; // plasmic-import: -k064DlQ8k8-L/icon
import GripsvgIcon from "../plasmic_kit_q_4_icons/icons/PlasmicIcon__Gripsvg"; // plasmic-import: jxIRSIMqs/icon
import VariantsvgIcon from "../plasmic_kit_q_4_icons/icons/PlasmicIcon__Variantsvg"; // plasmic-import: mSYwardqQ/icon

export type PlasmicVariantSection__VariantMembers = {
  state: "empty";
  isQuiet: "isQuiet";
  showSettings: "showSettings";
  hasCodeExpression: "hasCodeExpression";
  showIcon: "showIcon";
};

export type PlasmicVariantSection__VariantsArgs = {
  state?: SingleChoiceArg<"empty">;
  isQuiet?: SingleBooleanChoiceArg<"isQuiet">;
  showSettings?: SingleBooleanChoiceArg<"showSettings">;
  hasCodeExpression?: SingleBooleanChoiceArg<"hasCodeExpression">;
  showIcon?: SingleBooleanChoiceArg<"showIcon">;
};

type VariantPropType = keyof PlasmicVariantSection__VariantsArgs;
export const PlasmicVariantSection__VariantProps = new Array<VariantPropType>(
  "state",
  "isQuiet",
  "showSettings",
  "hasCodeExpression",
  "showIcon"
);

export type PlasmicVariantSection__ArgsType = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  emptyAddButtonText?: React.ReactNode;
};

type ArgPropType = keyof PlasmicVariantSection__ArgsType;
export const PlasmicVariantSection__ArgProps = new Array<ArgPropType>(
  "title",
  "children",
  "icon",
  "emptyAddButtonText"
);

export type PlasmicVariantSection__OverridesType = {
  root?: p.Flex<"div">;
  header?: p.Flex<"div">;
  iconContainer?: p.Flex<"div">;
  labelContainer?: p.Flex<"div">;
  actionsContainer?: p.Flex<"div">;
  menuButton?: p.Flex<typeof MenuButton>;
  settingsButton?: p.Flex<typeof IconButton>;
  exprButton?: p.Flex<typeof IconButton>;
  addButton?: p.Flex<typeof IconButton>;
  emptyAddButton?: p.Flex<typeof Button>;
  dragHandle?: p.Flex<"div">;
  body?: p.Flex<"div">;
  variantsContainer?: p.Flex<"div">;
};

export interface DefaultVariantSectionProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  emptyAddButtonText?: React.ReactNode;
  isQuiet?: SingleBooleanChoiceArg<"isQuiet">;
  showSettings?: SingleBooleanChoiceArg<"showSettings">;
  hasCodeExpression?: SingleBooleanChoiceArg<"hasCodeExpression">;
  showIcon?: SingleBooleanChoiceArg<"showIcon">;
  className?: string;
}

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());
const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function PlasmicVariantSection__RenderFunc(props: {
  variants: PlasmicVariantSection__VariantsArgs;
  args: PlasmicVariantSection__ArgsType;
  overrides: PlasmicVariantSection__OverridesType;

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

  const stateSpecs = React.useMemo(
    () => [
      {
        path: "state",
        type: "private",
        variableType: "variant",
        initFunc: true ? ($props, $state, $ctx) => $props.state : undefined,
      },

      {
        path: "isQuiet",
        type: "private",
        variableType: "variant",
        initFunc: true ? ($props, $state, $ctx) => $props.isQuiet : undefined,
      },

      {
        path: "showSettings",
        type: "private",
        variableType: "variant",
        initFunc: true
          ? ($props, $state, $ctx) => $props.showSettings
          : undefined,
      },

      {
        path: "hasCodeExpression",
        type: "private",
        variableType: "variant",
        initFunc: true
          ? ($props, $state, $ctx) => $props.hasCodeExpression
          : undefined,
      },

      {
        path: "showIcon",
        type: "private",
        variableType: "variant",
        initFunc: true ? ($props, $state, $ctx) => $props.showIcon : undefined,
      },
    ],

    [$props, $ctx]
  );

  const $state = p.useDollarState(stateSpecs, $props, $ctx);

  const [$queries, setDollarQueries] = React.useState({});

  const [isRootHover, triggerRootHoverProps] = useTrigger("useHover", {});
  const triggers = {
    hover_root: isRootHover,
  };

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
        plasmic_plasmic_kit_design_system_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        sty.root,
        { [sty.rootisQuiet]: hasVariant($state, "isQuiet", "isQuiet") }
      )}
      data-plasmic-trigger-props={[triggerRootHoverProps]}
    >
      <p.Stack
        as={"div"}
        data-plasmic-name={"header"}
        data-plasmic-override={overrides.header}
        hasGap={true}
        className={classNames(projectcss.all, sty.header, {
          [sty.headerisQuiet]: hasVariant($state, "isQuiet", "isQuiet"),
          [sty.headershowIcon]: hasVariant($state, "showIcon", "showIcon"),
          [sty.headerstate_empty]: hasVariant($state, "state", "empty"),
          [sty.headerstate_empty_isQuiet]:
            hasVariant($state, "isQuiet", "isQuiet") &&
            hasVariant($state, "state", "empty"),
        })}
      >
        <div
          data-plasmic-name={"iconContainer"}
          data-plasmic-override={overrides.iconContainer}
          className={classNames(projectcss.all, sty.iconContainer, {
            [sty.iconContainershowIcon]: hasVariant(
              $state,
              "showIcon",
              "showIcon"
            ),

            [sty.iconContainerstate_empty]: hasVariant(
              $state,
              "state",
              "empty"
            ),
          })}
        >
          {p.renderPlasmicSlot({
            defaultContents: (
              <VariantGroupIcon
                className={classNames(projectcss.all, sty.svg__gJ4Xi)}
                role={"img"}
              />
            ),

            value: args.icon,
            className: classNames(sty.slotTargetIcon, {
              [sty.slotTargetIconshowIcon]: hasVariant(
                $state,
                "showIcon",
                "showIcon"
              ),
            }),
          })}
        </div>

        <p.Stack
          as={"div"}
          data-plasmic-name={"labelContainer"}
          data-plasmic-override={overrides.labelContainer}
          hasGap={true}
          className={classNames(projectcss.all, sty.labelContainer, {
            [sty.labelContainerhasCodeExpression]: hasVariant(
              $state,
              "hasCodeExpression",
              "hasCodeExpression"
            ),

            [sty.labelContainerisQuiet]: hasVariant(
              $state,
              "isQuiet",
              "isQuiet"
            ),

            [sty.labelContainerstate_empty]: hasVariant(
              $state,
              "state",
              "empty"
            ),
          })}
        >
          {p.renderPlasmicSlot({
            defaultContents: "Variant Group Name",
            value: args.title,
            className: classNames(sty.slotTargetTitle, {
              [sty.slotTargetTitlehasCodeExpression]: hasVariant(
                $state,
                "hasCodeExpression",
                "hasCodeExpression"
              ),

              [sty.slotTargetTitleisQuiet]: hasVariant(
                $state,
                "isQuiet",
                "isQuiet"
              ),

              [sty.slotTargetTitleshowIcon]: hasVariant(
                $state,
                "showIcon",
                "showIcon"
              ),

              [sty.slotTargetTitleshowSettings]: hasVariant(
                $state,
                "showSettings",
                "showSettings"
              ),

              [sty.slotTargetTitlestate_empty]: hasVariant(
                $state,
                "state",
                "empty"
              ),

              [sty.slotTargetTitlestate_empty_isQuiet]:
                hasVariant($state, "isQuiet", "isQuiet") &&
                hasVariant($state, "state", "empty"),
            }),
          })}
        </p.Stack>

        <div
          data-plasmic-name={"actionsContainer"}
          data-plasmic-override={overrides.actionsContainer}
          className={classNames(projectcss.all, sty.actionsContainer, {
            [sty.actionsContainerhasCodeExpression]: hasVariant(
              $state,
              "hasCodeExpression",
              "hasCodeExpression"
            ),

            [sty.actionsContainerstate_empty]: hasVariant(
              $state,
              "state",
              "empty"
            ),

            [sty.actionsContainerstate_empty_isQuiet]:
              hasVariant($state, "isQuiet", "isQuiet") &&
              hasVariant($state, "state", "empty"),
          })}
        >
          {(triggers.hover_root ? true : false) ? (
            <MenuButton
              data-plasmic-name={"menuButton"}
              data-plasmic-override={overrides.menuButton}
              className={classNames("__wab_instance", sty.menuButton)}
            />
          ) : null}
          {(
            hasVariant($state, "showSettings", "showSettings") ? true : false
          ) ? (
            <IconButton
              data-plasmic-name={"settingsButton"}
              data-plasmic-override={overrides.settingsButton}
              children2={
                <ChevronDownsvgIcon
                  className={classNames(projectcss.all, sty.svg__w4Qxv)}
                  role={"img"}
                />
              }
              className={classNames("__wab_instance", sty.settingsButton, {
                [sty.settingsButtonhasCodeExpression]: hasVariant(
                  $state,
                  "hasCodeExpression",
                  "hasCodeExpression"
                ),

                [sty.settingsButtonshowSettings]: hasVariant(
                  $state,
                  "showSettings",
                  "showSettings"
                ),

                [sty.settingsButtonstate_empty]: hasVariant(
                  $state,
                  "state",
                  "empty"
                ),

                [sty.settingsButtonstate_empty_isQuiet]:
                  hasVariant($state, "isQuiet", "isQuiet") &&
                  hasVariant($state, "state", "empty"),
              })}
            >
              <GearIcon
                className={classNames(projectcss.all, sty.svg__uGhUb)}
                role={"img"}
              />
            </IconButton>
          ) : null}
          {(
            hasVariant($state, "hasCodeExpression", "hasCodeExpression")
              ? true
              : true
          ) ? (
            <IconButton
              data-plasmic-name={"exprButton"}
              data-plasmic-override={overrides.exprButton}
              className={classNames("__wab_instance", sty.exprButton, {
                [sty.exprButtonhasCodeExpression]: hasVariant(
                  $state,
                  "hasCodeExpression",
                  "hasCodeExpression"
                ),
              })}
              isActive={true}
              size={"small" as const}
              type={["seamless"]}
            >
              {(
                hasVariant($state, "hasCodeExpression", "hasCodeExpression")
                  ? true
                  : true
              ) ? (
                <CodeIcon
                  className={classNames(projectcss.all, sty.svg__wGxvY, {
                    [sty.svghasCodeExpression__wGxvYqVc3M]: hasVariant(
                      $state,
                      "hasCodeExpression",
                      "hasCodeExpression"
                    ),
                  })}
                  role={"img"}
                />
              ) : null}
            </IconButton>
          ) : null}
          {(
            hasVariant($state, "isQuiet", "isQuiet") &&
            hasVariant($state, "state", "empty")
              ? true
              : hasVariant($state, "state", "empty")
              ? false
              : true
          ) ? (
            <IconButton
              data-plasmic-name={"addButton"}
              data-plasmic-override={overrides.addButton}
              children2={
                <ChevronDownsvgIcon
                  className={classNames(projectcss.all, sty.svg__vxfGq)}
                  role={"img"}
                />
              }
              className={classNames("__wab_instance", sty.addButton, {
                [sty.addButtonhasCodeExpression]: hasVariant(
                  $state,
                  "hasCodeExpression",
                  "hasCodeExpression"
                ),

                [sty.addButtonstate_empty]: hasVariant(
                  $state,
                  "state",
                  "empty"
                ),

                [sty.addButtonstate_empty_isQuiet]:
                  hasVariant($state, "isQuiet", "isQuiet") &&
                  hasVariant($state, "state", "empty"),
              })}
            >
              <PlusIcon
                className={classNames(projectcss.all, sty.svg__rh6GJ, {
                  [sty.svghasCodeExpression__rh6GJqVc3M]: hasVariant(
                    $state,
                    "hasCodeExpression",
                    "hasCodeExpression"
                  ),
                })}
                role={"img"}
              />
            </IconButton>
          ) : null}
          {(
            hasVariant($state, "isQuiet", "isQuiet") &&
            hasVariant($state, "state", "empty")
              ? false
              : hasVariant($state, "state", "empty")
              ? true
              : false
          ) ? (
            <Button
              data-plasmic-name={"emptyAddButton"}
              data-plasmic-override={overrides.emptyAddButton}
              className={classNames("__wab_instance", sty.emptyAddButton, {
                [sty.emptyAddButtonisQuiet]: hasVariant(
                  $state,
                  "isQuiet",
                  "isQuiet"
                ),

                [sty.emptyAddButtonstate_empty]: hasVariant(
                  $state,
                  "state",
                  "empty"
                ),

                [sty.emptyAddButtonstate_empty_isQuiet]:
                  hasVariant($state, "isQuiet", "isQuiet") &&
                  hasVariant($state, "state", "empty"),
              })}
              endIcon={
                <ChevronDownsvgIcon
                  className={classNames(projectcss.all, sty.svg__wQfgt)}
                  role={"img"}
                />
              }
              font={
                hasVariant($state, "isQuiet", "isQuiet")
                  ? ("dim" as const)
                  : undefined
              }
              size={"small" as const}
              startIcon={
                <PlusIcon
                  className={classNames(projectcss.all, sty.svg__ypiQa)}
                  role={"img"}
                />
              }
              type={
                hasVariant($state, "isQuiet", "isQuiet") &&
                hasVariant($state, "state", "empty")
                  ? ["clear"]
                  : ["primary"]
              }
              withIcons={["startIcon"]}
            >
              {p.renderPlasmicSlot({
                defaultContents: "Add option",
                value: args.emptyAddButtonText,
              })}
            </Button>
          ) : null}
        </div>

        <div
          data-plasmic-name={"dragHandle"}
          data-plasmic-override={overrides.dragHandle}
          className={classNames(projectcss.all, sty.dragHandle, {
            [sty.dragHandlestate_empty]: hasVariant($state, "state", "empty"),
          })}
        >
          <GripsvgIcon
            className={classNames(projectcss.all, sty.svg__srcvf)}
            role={"img"}
          />
        </div>
      </p.Stack>

      {(hasVariant($state, "state", "empty") ? false : true) ? (
        <div
          data-plasmic-name={"body"}
          data-plasmic-override={overrides.body}
          className={classNames(projectcss.all, sty.body, {
            [sty.bodyisQuiet]: hasVariant($state, "isQuiet", "isQuiet"),
            [sty.bodystate_empty]: hasVariant($state, "state", "empty"),
            [sty.bodystate_empty_isQuiet]:
              hasVariant($state, "isQuiet", "isQuiet") &&
              hasVariant($state, "state", "empty"),
          })}
        >
          <div
            data-plasmic-name={"variantsContainer"}
            data-plasmic-override={overrides.variantsContainer}
            className={classNames(projectcss.all, sty.variantsContainer, {
              [sty.variantsContainerstate_empty]: hasVariant(
                $state,
                "state",
                "empty"
              ),
            })}
          >
            {p.renderPlasmicSlot({
              defaultContents: (
                <VariantRow
                  className={classNames(
                    "__wab_instance",
                    sty.variantRow___5OoLc
                  )}
                  icon={
                    <VariantsvgIcon
                      className={classNames(projectcss.all, sty.svg__dhNhp)}
                      role={"img"}
                    />
                  }
                >
                  {"Something"}
                </VariantRow>
              ),

              value: args.children,
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "header",
    "iconContainer",
    "labelContainer",
    "actionsContainer",
    "menuButton",
    "settingsButton",
    "exprButton",
    "addButton",
    "emptyAddButton",
    "dragHandle",
    "body",
    "variantsContainer",
  ],

  header: [
    "header",
    "iconContainer",
    "labelContainer",
    "actionsContainer",
    "menuButton",
    "settingsButton",
    "exprButton",
    "addButton",
    "emptyAddButton",
    "dragHandle",
  ],

  iconContainer: ["iconContainer"],
  labelContainer: ["labelContainer"],
  actionsContainer: [
    "actionsContainer",
    "menuButton",
    "settingsButton",
    "exprButton",
    "addButton",
    "emptyAddButton",
  ],

  menuButton: ["menuButton"],
  settingsButton: ["settingsButton"],
  exprButton: ["exprButton"],
  addButton: ["addButton"],
  emptyAddButton: ["emptyAddButton"],
  dragHandle: ["dragHandle"],
  body: ["body", "variantsContainer"],
  variantsContainer: ["variantsContainer"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
  header: "div";
  iconContainer: "div";
  labelContainer: "div";
  actionsContainer: "div";
  menuButton: typeof MenuButton;
  settingsButton: typeof IconButton;
  exprButton: typeof IconButton;
  addButton: typeof IconButton;
  emptyAddButton: typeof Button;
  dragHandle: "div";
  body: "div";
  variantsContainer: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicVariantSection__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> = {
  // Explicitly specify variants, args, and overrides as objects
  variants?: PlasmicVariantSection__VariantsArgs;
  args?: PlasmicVariantSection__ArgsType;
  overrides?: NodeOverridesType<T>;
} & Omit<PlasmicVariantSection__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
  // Specify args directly as props
  Omit<PlasmicVariantSection__ArgsType, ReservedPropsType> &
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
          internalArgPropNames: PlasmicVariantSection__ArgProps,
          internalVariantPropNames: PlasmicVariantSection__VariantProps,
        }),

      [props, nodeName]
    );

    return PlasmicVariantSection__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicVariantSection";
  } else {
    func.displayName = `PlasmicVariantSection.${nodeName}`;
  }
  return func;
}

export const PlasmicVariantSection = Object.assign(
  // Top-level PlasmicVariantSection renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    header: makeNodeComponent("header"),
    iconContainer: makeNodeComponent("iconContainer"),
    labelContainer: makeNodeComponent("labelContainer"),
    actionsContainer: makeNodeComponent("actionsContainer"),
    menuButton: makeNodeComponent("menuButton"),
    settingsButton: makeNodeComponent("settingsButton"),
    exprButton: makeNodeComponent("exprButton"),
    addButton: makeNodeComponent("addButton"),
    emptyAddButton: makeNodeComponent("emptyAddButton"),
    dragHandle: makeNodeComponent("dragHandle"),
    body: makeNodeComponent("body"),
    variantsContainer: makeNodeComponent("variantsContainer"),

    // Metadata about props expected for PlasmicVariantSection
    internalVariantProps: PlasmicVariantSection__VariantProps,
    internalArgProps: PlasmicVariantSection__ArgProps,
  }
);

export default PlasmicVariantSection;
/* prettier-ignore-end */