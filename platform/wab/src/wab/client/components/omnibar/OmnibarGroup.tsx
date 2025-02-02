/** @format */

import { UseComboboxGetItemPropsOptions } from "downshift";
import * as React from "react";
import { MaybeWrap } from "../../../commons/components/ReactUtil";
import { isCommandItem } from "../../definitions/commands";
import {
  AddItemType,
  AddTplItem,
  isAddItem,
} from "../../definitions/insertables";
import {
  DefaultOmnibarGroupProps,
  PlasmicOmnibarGroup,
} from "../../plasmic/plasmic_kit_omnibar/PlasmicOmnibarGroup";
import { StudioCtx } from "../../studio-ctx/StudioCtx";
import { DraggableInsertable } from "../studio/add-drawer/DraggableInsertable";
import { PlainLink } from "../widgets";
import { OmnibarGroupData, OmnibarItem } from "./Omnibar";
import OmnibarAddItem from "./OmnibarAddItem";
import OmnibarCommandItem from "./OmnibarCommandItem";

interface OmnibarGroupProps extends DefaultOmnibarGroupProps {
  studioCtx: StudioCtx;
  data: OmnibarGroupData;
  highlightedIndex: number;
  getItemProps: (opt: UseComboboxGetItemPropsOptions<OmnibarItem>) => any;
  getItemIndex: (i: OmnibarItem) => number;
  onDragStart: () => void;
  onDragEnd: (item: OmnibarItem) => void;
  coerceRows?: boolean; // Should we force everything in the group into a CommandItem?
}

function OmnibarGroup(props: OmnibarGroupProps) {
  const {
    studioCtx,
    data,
    highlightedIndex,
    getItemProps,
    getItemIndex,
    onDragStart,
    onDragEnd,
    coerceRows,
    ...rest
  } = props;
  const [commandItems, addItems] = coerceRows
    ? [data.items, []]
    : [
        data.items.filter((i) => isCommandItem(i)),
        data.items.filter((i) => isAddItem(i)),
      ];

  return (
    <PlasmicOmnibarGroup
      {...rest}
      title={data.label}
      codeName={
        data.codeLink ? (
          <PlainLink
            style={{ color: "inherit" }}
            href={data.codeLink}
            target="_blank"
          >
            {data.codeName}
          </PlainLink>
        ) : (
          data.codeName ?? null
        )
      }
      rightBtn={data.rightBtn || null}
      commandChildren={commandItems.map((i) => (
        <div key={i.key} {...getItemProps({ item: i, index: getItemIndex(i) })}>
          <OmnibarCommandItem
            title={i.label}
            icon={i.icon}
            withKeyboardShortcut={false}
            keyboardShortcut={undefined}
            focused={highlightedIndex === getItemIndex(i)}
          />
        </div>
      ))}
      addChildren={addItems.map((i) => {
        const hasImage =
          (i.type === AddItemType.tpl || i.type === AddItemType.fake) &&
          !!i.previewImage;
        return (
          <div
            key={i.key}
            {...getItemProps({ item: i, index: getItemIndex(i) })}
          >
            <MaybeWrap
              cond={
                isAddItem(i) &&
                i.type === "tpl" &&
                // Note: The async prompt that we use to populate this will break
                //   Dnd. So we only enable Dnd after we've figured this out
                //   Todo: fix how we do asyncExtraInfo to support prompts that interrupt Dnd
                !!studioCtx.projectDependencyManager.insertableSiteScreenVariant
              }
              wrapper={(child) => (
                <DraggableInsertable
                  key={i.key}
                  sc={studioCtx}
                  spec={i as AddTplItem}
                  onDragStart={onDragStart}
                  onDragEnd={() => {
                    onDragEnd(i);
                  }}
                >
                  {child}
                </DraggableInsertable>
              )}
            >
              <OmnibarAddItem
                title={i.label}
                icon={
                  React.isValidElement(i.icon)
                    ? React.cloneElement(i.icon, {
                        className: "custom-svg-icon--xlg",
                      })
                    : i.icon
                }
                grayImageBackground={i["gray"]}
                //size={"large"}
                // Only show the
                preview={hasImage ? "image" : "icon"}
                previewImage={
                  i.type === AddItemType.tpl || i.type === AddItemType.fake
                    ? i.previewImage
                    : null
                }
                focused={highlightedIndex === getItemIndex(i)}
                data-test-id={`omnibar-add-${i.label}`}
              />
            </MaybeWrap>
          </div>
        );
      })}
    />
  );
}

export default OmnibarGroup;
