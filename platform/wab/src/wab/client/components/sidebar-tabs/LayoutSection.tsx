import { Menu } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { DEVFLAGS } from "../../../devflags";
import {
  ContainerLayoutType,
  ensureContainerType,
  getContainerTypeName,
  getRshContainerType,
} from "../../../shared/layoututils";
import { VariantedStylesHelper } from "../../../shared/VariantedStylesHelper";
import GridIcon from "../../plasmic/plasmic_kit/PlasmicIcon__Grid";
import ArrowDownIcon from "../../plasmic/plasmic_kit_style_controls/icons/PlasmicIcon__ArrowDown";
import ArrowRightIcon from "../../plasmic/plasmic_kit_style_controls/icons/PlasmicIcon__ArrowRight";
import WildcardIcon from "../../plasmic/plasmic_kit_style_controls/icons/PlasmicIcon__Wildcard";
import { MenuBuilder } from "../menu-builder";
import {
  ExpsProvider,
  StylePanelSection,
  useStyleComponent,
} from "../style-controls/StyleComponent";
import StyleToggleButton from "../style-controls/StyleToggleButton";
import StyleToggleButtonGroup from "../style-controls/StyleToggleButtonGroup";
import { Icon } from "../widgets/Icon";
import { ContentLayoutContainerControls } from "./ContentLayoutControls";
import { FlexContainerControls } from "./FlexContainerControls";
import { GridControls } from "./GridControls";

type LayoutSectionProps = {
  expsProvider: ExpsProvider;
  vsh?: VariantedStylesHelper;
  isCodeComponentTpl?: boolean;
};
export const LayoutSection = observer(function LayoutSection_(
  props: LayoutSectionProps
) {
  const styling = useStyleComponent();
  const hasDisplay = styling.exp().has("display");
  const containerType = getRshContainerType(styling.exp());
  const makeMenu = DEVFLAGS.pageLayout
    ? (builder: MenuBuilder) => {
        builder.genSection("Convert to...", (push) => {
          if (
            containerType === ContainerLayoutType.contentLayout ||
            containerType === ContainerLayoutType.grid
          ) {
            for (const type of [
              ContainerLayoutType.flexRow,
              ContainerLayoutType.flexColumn,
              ContainerLayoutType.free,
              ContainerLayoutType.grid,
              ContainerLayoutType.contentLayout,
            ]) {
              if (containerType !== type) {
                push(
                  <Menu.Item
                    key={type}
                    onClick={() =>
                      props.expsProvider.onContainerTypeChange(type)
                    }
                  >
                    {getContainerTypeName(type)}
                  </Menu.Item>
                );
              }
            }
          } else {
            for (const type of [
              ContainerLayoutType.grid,
              ContainerLayoutType.contentLayout,
            ]) {
              push(
                <Menu.Item
                  key={type}
                  onClick={() => props.expsProvider.onContainerTypeChange(type)}
                >
                  {getContainerTypeName(type)}
                </Menu.Item>
              );
            }
          }
        });
      }
    : undefined;

  return (
    <StylePanelSection
      hasMore
      title="Layout"
      expsProvider={props.expsProvider}
      extraMenuItems={makeMenu}
      controls={
        (props.isCodeComponentTpl ||
          containerType !== ContainerLayoutType.grid) &&
        (containerType === ContainerLayoutType.contentLayout ? (
          <span>Document layout</span>
        ) : (
          <StyleToggleButtonGroup
            value={containerType}
            onChange={(val) => {
              props.expsProvider.onContainerTypeChange(
                ensureContainerType(val)
              );
            }}
            styleType="right"
            autoWidth
          >
            {
              <>
                <StyleToggleButton
                  value="free"
                  tooltip="Free"
                  data-test-id="layout-free"
                >
                  <Icon icon={WildcardIcon} size={17} />
                </StyleToggleButton>
                <StyleToggleButton
                  value={ContainerLayoutType.flexColumn}
                  tooltip="Vertical"
                  data-test-id="layout-vstack"
                >
                  <Icon icon={ArrowDownIcon} size={17} />
                </StyleToggleButton>
                <StyleToggleButton
                  value={ContainerLayoutType.flexRow}
                  tooltip="Horizontal"
                  data-test-id="layout-hstack"
                >
                  <Icon icon={ArrowRightIcon} size={17} />
                </StyleToggleButton>
                {props.isCodeComponentTpl && (
                  <StyleToggleButton
                    value={ContainerLayoutType.grid}
                    tooltip="Grid"
                    data-test-id="layout-grid"
                  >
                    <Icon icon={GridIcon} size={17} />
                  </StyleToggleButton>
                )}
              </>
            }
          </StyleToggleButtonGroup>
        ))
      }
      styleProps={[
        "display",
        "overflow",
        "flex-direction",
        "justify-content",
        "align-items",
        "align-content",
        "flex-wrap",
        "flex-row-gap",
        "flex-column-gap",
        "grid-template-rows",
        "grid-template-columns",
        "grid-row-gap",
        "grid-column-gap",
        "grid-auto-rows",
        "grid-auto-columns",
      ]}
      unremovableStyleProps={["display"]}
    >
      {(renderMaybeCollapsibleRows) =>
        hasDisplay && (
          <>
            {containerType === ContainerLayoutType.free && (
              <p>Children can be freely positioned.</p>
            )}
            {containerType && containerType.includes("flex") && (
              <FlexContainerControls
                expsProvider={props.expsProvider}
                renderMaybeCollapsibleRows={renderMaybeCollapsibleRows}
                vsh={props.vsh}
              />
            )}
            {containerType === ContainerLayoutType.grid && (
              <GridControls expsProvider={props.expsProvider} />
            )}
            {containerType === ContainerLayoutType.contentLayout && (
              <ContentLayoutContainerControls
                expsProvider={props.expsProvider}
              />
            )}
          </>
        )
      }
    </StylePanelSection>
  );
});
